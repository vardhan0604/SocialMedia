import { useDispatch, useSelector } from "react-redux";
import { 
  Box,
  Typography,
  useTheme,
  useMediaQuery
 } from "@mui/material"
 import TextField from '@mui/material/TextField';
 import Button from '@mui/material/Button';
 import { FormControl, FormLabel } from '@mui/material';
import Form from "./Form";


const LoginPage = () => {
  const user =useSelector((state)=> state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
  const theme =useTheme();
  

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <Box height="100%">
       <Box
      width="100%"
      backgroundColor={alt}
      textAlign="center"
      padding="1rem 6%"
    marginBottom="2rem">
      <Typography fontWeight="bold" fontSize="32px" color="primary" >
          Sociopedia
        </Typography> 
      </Box>
      <Box  display= "flex" height="100%"  alignItems="center" justifyContent="center"> 
      <Form />
      </Box>
   
    </Box>
  )
}

export default LoginPage
  