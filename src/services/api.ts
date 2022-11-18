import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { tokenValidate } from '../util/tokenValidate';

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

export function setupAPIClient(
  ctx?: GetServerSidePropsContext,
  req?: NextApiRequest,
  baseURL?: string
) {

  let cookies = parseCookies(ctx ?? { req });
  
  const api = axios.create({
    baseURL: baseURL ?? '/api',
    headers: {
      Authorization: req?.headers?.authorization?.includes('undefined') ? `Bearer ${cookies['epharma-drug-research.token']}` : req?.headers?.authorization ?? `Bearer ${cookies['epharma-drug-research.token']}`,      
    },
  });

  api.interceptors.response.use(res => {
    return res;

  }, (error: AxiosError) => {

    
    if (error.response?.status === 401){
      const { 'epharma-drug-research.token': token } = cookies;
            // toda a configuração da rota original para ser montada uma nova chamada
            const originalConfig = error.config;

            if (!tokenValidate(token)) {
                isRefreshing = true;

                api.get('/auth').then(response => {
                    if (response.status === 200) {
                        const { token } = response.data;

                        setCookie(ctx, 'epharma-drug-research.token', token, {
                            maxAge: 60 * 60,
                            path: '/'
                        });

                        api.defaults.headers['Authorization'] = `Bearer ${token}`;

                        failedRequestsQueue.forEach(request => request.onSucess(token));
                        failedRequestsQueue = [];
                    }
                }).catch(err => {
                    failedRequestsQueue.forEach(request => request.onFailure(err));
                    failedRequestsQueue = [];
                }).finally(() => {
                    isRefreshing = false;
                });
            }


            return new Promise((resolve, reject) => {
                failedRequestsQueue.push({
                    onSucess: (token: string) => {           
                              
                      if(originalConfig?.headers?.common?.has('Authorization')){
                        originalConfig.headers['Authorization'] = `Bearer ${token}`;
                      }
                      
                        resolve(api(originalConfig!));
                    },
                    onFailure: (err: AxiosError) => {
                        reject(err)
                    }
                })
            })
    }

    return Promise.reject(error)
  })

  return api;
}