import { GetServerSidePropsContext, NextApiRequest } from "next";
import { setupAPIClient } from "./api";

export const apiSSR = (
    ctx?: GetServerSidePropsContext,
    req?: NextApiRequest,
) => {
    return setupAPIClient(ctx, req, process.env.BASE)
}
