import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({  
  palette: {    
    primary: {
      main: '#92e6e6',
    },
    secondary: {
      main: '#fd0578',
    },
    error: {
      main: red.A400,
    },
    background: {
        default: grey[50]
    },
    text: {
      primary: '#323c44'
    }    
  }
});

export default theme;
