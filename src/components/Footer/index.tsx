import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';



export const Footer = () => {


  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Box
        width="100%"       
        sx={{
            backgroundColor: '#323c44',
            p: 1,
            height: '3rem'
        }}
        component="footer"
        >
      <Box 
        display="flex"
        flexDirection={!matches ? "column" : "row"}
        alignItems="center"              
        justifyContent="space-around"
        height="100%"
        color="#fff"
        
      >

      
      </Box>
    </Box>
  )
}