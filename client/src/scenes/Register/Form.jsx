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


const Form = () => {
    const theme =useTheme();
    const alt = theme.palette.background.alt;


    const registerSchema = useFormik({
        initialValues: {
          
          firstName: '',
          lastName: '',      
          email: '',
          password: '',
          occupation: '',
          Picture: '',
          location: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
            .min(8, 'Must be 8 characters atleast')
            .required('*Required'),
          email: Yup.string().email('Invalid email address').required('*Required'),
          firstName :Yup.string().required('*Required'),
          lastName :Yup.string().required('*Required'),
          occupation :Yup.string().required('*Required'),
          location :Yup.string().required('*Required'),
          Picture :Yup.string().required('*Required'),
        }),
        onSubmit: async (values,{ resetForm }) => {
          
          // this allows us to send formdata with an image
          const formData = new FormData();
          for(let value in registerSchema.values){
            formData.append(value,registerSchema.values[value]);
          }
          
          formData.append('picturePath',registerSchema.values.Picture.name)

         


          const savedUserResponse= await fetch(
            "http://localhost:3001/auth/register",
            {
              method:"POST",
              body: formData,
            }
          )
          const savedUser=await savedUserResponse.json();
          resetForm();

          if(savedUser){
            handleButtonClick()
          }
        },
      });

      const {palette}=useTheme();
      const dispatch = useDispatch();
      const navigate =useNavigate();
     
    const isNonMobileScreen = useMediaQuery("(min-width: 600px)")
    const width=isNonMobileScreen? "40%":"80%";

    const handleButtonClick = () => {
      navigate('/login');
    };



      return (
        <Box display= "flex" alignItems="center" borderRadius="16px"flexDirection="column" width={width} justifyContent="center" backgroundColor={alt} padding="3% 5%">
          <Typography fontWeight="bold" fontSize="30px" color="primary" padding="0 0 3rem 0">
          Register
        </Typography> 
        <form onSubmit={registerSchema.handleSubmit} style={{width: "-webkit-fill-available"}}>
          <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(2,minmax(0,1fr))"
          sx={{
            "& > div" :{
              gridColumn: isNonMobileScreen ? undefined : "span 2"
            }
          }}
          >
                  <TextField 
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      fullWidth
                      onChange={registerSchema.handleChange}
                      onBlur={registerSchema.handleBlur}
                      value={registerSchema.values.firstName}
                      error={
                        Boolean(registerSchema.touched.firstName) &&  Boolean(registerSchema.errors.firstName) 
                      }
                      helperText={registerSchema.touched.firstName &&  Boolean(registerSchema.errors.firstName)}
                      sx={{
                        gridColumn: isNonMobileScreen ? "span 1" : "span 2"
                        
                      }}
                  />
                
                  {/* {registerSchema.touched.password && registerSchema.errors.password ? (
                      <Box color="red">{registerSchema.errors.password}</Box>
                  ) : null} */}
             
                  <TextField 
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      fullWidth
                      onChange={registerSchema.handleChange}
                      onBlur={registerSchema.handleBlur}
                      value={registerSchema.values.lastName}
                      error={
                        Boolean(registerSchema.touched.lastName) &&  Boolean(registerSchema.errors.lastName) 
                      }
                      helperText={registerSchema.touched.lastName &&  Boolean(registerSchema.errors.lastName)}
                      sx={{
                        gridColumn: isNonMobileScreen ? "span 1" : "span 2"
                    }}
                  />
      
               
             
                  <TextField 
                      id="occupation"
                      name="occupation"
                      type="text"
                      placeholder="occupation"
                      fullWidth
                      onChange={registerSchema.handleChange}
                      onBlur={registerSchema.handleBlur}
                      value={registerSchema.values.occupation}
                      error={
                        Boolean(registerSchema.touched.occupation) &&  Boolean(registerSchema.errors.occupation) 
                      }
                      helperText={registerSchema.touched.occupation &&  Boolean(registerSchema.errors.occupation)}
                      sx={{
                        gridColumn: "span 2"
                    }}
                  />
                
               
          
                  <TextField 
                      id="location"
                      name="location"
                      type="text"
                      placeholder="location"
                      fullWidth
                      onChange={registerSchema.handleChange}
                      onBlur={registerSchema.handleBlur}
                      value={registerSchema.values.location}
                      error={
                        Boolean(registerSchema.touched.location) &&  Boolean(registerSchema.errors.location) 
                      }
                      helperText={registerSchema.touched.location &&  Boolean(registerSchema.errors.location)}
                      sx={{
                        gridColumn:"span 2"
                    }}
                  />
              
            
                  <Box 
                      border={`1px solid ${palette.neutral.medium}`}
                      borderRadius="5px"
                      gridColumn="span 2"
                      p="1rem"  
                  >
                    <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles)=>
                    registerSchema.setFieldValue('Picture', acceptedFiles[0])}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover":{cursor:"pointer"}
                        }}
                        >
                          <input {...getInputProps()} />
                          {!registerSchema.values.Picture ? (<p>Drag and drop a file here, or click to select a file</p>):
                          ( <FlexBetween>
                            <Typography>{registerSchema.values.Picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>)}
                          
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                
               
        
                  <TextField 
                      id="email"
                      name="email"
                      type="text"
                      placeholder="email"
                      fullWidth
                      onChange={registerSchema.handleChange}
                      onBlur={registerSchema.handleBlur}
                      value={registerSchema.values.email}
                      error={
                        Boolean(registerSchema.touched.email) &&  Boolean(registerSchema.errors.email) 
                      }
                      helperText={registerSchema.touched.email &&  Boolean(registerSchema.errors.email)}
                      sx={{
                        gridColumn: "span 2"
                    }}
                  />
                  
           
                  <TextField 
                      id="password"
                      name="password"
                      type="password"
                      placeholder="password"
                      fullWidth
                      onChange={registerSchema.handleChange}
                      onBlur={registerSchema.handleBlur}
                      value={registerSchema.values.password}
                      error={
                        Boolean(registerSchema.touched.password) &&  Boolean(registerSchema.errors.password) 
                      }
                      helperText={registerSchema.touched.password &&  Boolean(registerSchema.errors.password)}
                      sx={{
                        gridColumn: "span 2"
                    }}
                  />

              
              
          </Box>
          <Button onSubmit={registerSchema.onSubmit} color="primary" variant="contained" fullWidth type="submit" sx={{marginTop: "3rem",fontWeight: "600"}}>
                Register
            </Button>

        </form>
        <Button variant="contained" fullWidth type="submit" sx={{marginTop: "3rem",fontWeight: "600",backgroundColor: palette.neutral.light, color: "white"}} onClick={handleButtonClick}>
              Already have an Account? Log In here
            </Button>
        </Box>
      );
}

export default Form  

