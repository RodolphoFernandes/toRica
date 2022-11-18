import { Box, CircularProgress, Backdrop as BackdropMUI} from "@mui/material"

interface Props{
  open: boolean
}

export const Backdrop = ({open}: Props) => {
 
  return (
    <Box>
      <BackdropMUI
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={open}        
      >
        <CircularProgress color="inherit" />
      </BackdropMUI>
    </Box>
  )
}