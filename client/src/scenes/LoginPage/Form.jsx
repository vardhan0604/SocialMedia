import { useState } from "react"

import { 
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
    useMediaQuery
   } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined" 
import { useFormik  } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state"
import Dropzone from "react-dropzone"
import FlexBetween from "components/FlexBetween"
import { Password } from "@mui/icons-material"

const Form = () => {
    const theme =useTheme();
    const alt = theme.palette.background.alt;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginSchema = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
            .min(8, 'Must be 8 characters atleast')
            .required('*Required'),
          email: Yup.string().email('Invalid email address').required('*Required'),
        }),
        onSubmit: async (values,{ resetForm })  => {
          const LoggedInResponse= await fetch(
            "http://localhost:3001/auth/login",
            {
              method:"POST",
              headers:{"Content-Type": "application/json"},
              body: JSON.stringify(values),
            }
          )
          const loggedIn= await LoggedInResponse.json();
          console.log(loggedIn)
          resetForm();
          if(loggedIn){
            dispatch(
              setLogin({
                user: loggedIn.user,
                token: loggedIn.token
              })
            )
            navigate("/")
          }
        },
      });


     
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    const width=isNonMobileScreen? "40%":"93%";

    const handleButtonClick = () => {
      navigate('/register');
    };
      return (
        <Box display= "flex" alignItems="center" borderRadius="16px"flexDirection="column" width={width} justifyContent="center"backgroundColor={alt} padding="6% 5%">
          <Typography fontWeight="bold" fontSize="30px" color="primary" padding="0 0 3rem 0">
          LOGIN HERE
        </Typography> 
        <form onSubmit={loginSchema.handleSubmit} style={{width: "-webkit-fill-available"}}>
            <Box margin="0rem 0 3rem 0"> 
                <FlexBetween gap="2rem">
                    <label htmlFor="email">Email Address</label>
                    <TextField
                        id="email"
                        name="email"
                        fullWidth
                        type="email"
                        onChange={loginSchema.handleChange}
                        onBlur={loginSchema.handleBlur}
                        value={loginSchema.values.email}
                    />
                </FlexBetween>
                {loginSchema.touched.email && loginSchema.errors.email ? (
                    <Box color="red">{loginSchema.errors.email}</Box>
                ) : null}
            </Box>
            <Box margin="0rem 0 3rem 0">
                <FlexBetween gap="2rem">
                <label htmlFor="password">password</label>
                <TextField 
                    id="password"
                    name="password"
                    type="password"
                    fullWidth
                    onChange={loginSchema.handleChange}
                    onBlur={loginSchema.handleBlur}
                    value={loginSchema.values.password}
                />
                </FlexBetween>
                {loginSchema.touched.password && loginSchema.errors.password ? (
                    <Box color="red">{loginSchema.errors.password}</Box>
                ) : null}
            </Box>
            <Button color="primary" variant="contained" fullWidth type="submit" >
                LOG IN
            </Button>

        </form>
        <Button variant="contained" fullWidth type="submit" sx={{marginTop: "3rem",fontWeight: "600",backgroundColor: theme.palette.neutral.light, color: "white" }} onClick={handleButtonClick}>
              New here? Register here
            </Button>
        </Box>
      );
}

export default Form  