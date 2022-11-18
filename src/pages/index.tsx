import Image from 'next/image';
import { 
  Box, 
  Stack, 
  Typography, 
  Button,  
  Container,
  Grid,
  Alert
} from "@mui/material";

import { apiSSR } from '../services/apiSSR';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { setCookie } from 'nookies';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import { Input } from '../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';


interface Props {
  token: string;
}

export default function Home({token}: Props) {
  const [numbers, setNumbers] = useState<string[]>([]);

  const matches = useMediaQuery('(min-width:600px)');

  const { control, handleSubmit, formState, setValue} = useForm({
    //resolver: yupResolver<any>()
  });

  const handleNumbers: SubmitHandler<any> = async (values) => {
    setNumbers([]);
    let numbersTemp: string[] = [];
    let result: string[] = [];

    const quantity = +values['quantity'];
    const quantityNumbersPerPlay = +values['quantityNumbersPerPlay'];
    
    for(var i = 0; i < quantity;i++){
      
      for(var x = 0; x < quantityNumbersPerPlay;x++){

        let different = false;        
       
        do{

          var numberTemp = (Math.floor(Math.random() * 60) + 1).toString().padStart(2, '0');

          if(!numbersTemp.includes(numberTemp)){
            numbersTemp.push(numberTemp);
            different = true;
          }

        }while(different === false);
      }

      result.push(numbersTemp.join(" "));     
      numbersTemp = [];
    }

    setNumbers((old: string[]) => [...old, ...result ]);

  }

  
  return (  
    <> 
      <main>
        <Box
          sx={{
            paddingTop: !matches ? 4 : 10,
            paddingBottom: 6,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '95vh',
          }}
        >        
          <Container 
            maxWidth="sm"          
          >
            <Stack
              component="form"
              onSubmit={handleSubmit(handleNumbers)} 
              sx={{ pt: 1, pb: 2 }}
              direction={"column"}
              spacing={2}
              justifyContent="center"
              marginTop={!matches ? 4 : 0}    
            > 
              <Input 
                name="quantityNumbersPerPlay"
                control={control}
                type='number'
                label='Quantidade de números por jogo'                
                inputProps={{
                  inputMode: 'numeric', pattern: '[0-9]*', min: 6, max: 15
                }}
              />

              <Input 
                name="quantity"
                control={control}
                type="number"
                label='Quantidade de jogos'
                inputProps={{
                  inputMode: 'numeric', pattern: '[0-9]*', min: 1
                }}
              />
              <Button 
                variant="contained"
                type='submit'   
                sx={{
                  borderRadius: 50 / 2,
                  paddingX: 2
                }}
                startIcon={<CasinoOutlinedIcon />}
                //onClick={() => setOptionSearch('Store')}
                >
                  Gerar números
              </Button>
            </Stack>
            <Stack
              sx={{ pt: 1, pb: 2 }}
              direction={"column"}
              spacing={2}
              justifyContent="center"
              marginTop={!matches ? 4 : 0}
            >
              {
                numbers?.map((n: string) => (
                  <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  width='100%'
                  >
                    {n.split(' ').map(text => (
                      <Typography variant='body1' fontWeight='bold'>{text}</Typography>
                    ))}
                  </Box>                
                ))
              }
              
            </Stack>
          </Container>
                    
        </Box>
      </main>    
    
      <Footer />
    </>
      
  )
}

export async function getStaticProps() {

  const response = await apiSSR(undefined).get('/Authentication/api/v1/OAuth/Authenticate'
    , {
      headers: {
        'client_id': process.env.CLIENT_ID,
        'username': process.env.USERNAME_AUTH,
        'password': process.env.PASSWORD_AUTH
      }
    }
  );

  const { 'accessToken': token } = response.data.data.token;

  return {
    props: {
      token
    }, 
    revalidate: 60 * 60
  }
}
