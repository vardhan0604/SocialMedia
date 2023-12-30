import { useState } from "react"
import { 
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
 } from "@mui/material"
import { 
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
 } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setMode , setLogout} from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenu,setIsMobileMenu]=useState(false);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const user =useSelector((state)=> state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
  const theme =useTheme(); 

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const name =`${user.firstName} ${user.lastName}`

  // const name ="Harshvardhan"

  return (
    <FlexBetween padding="0.4rem 6%" backgroundColor={alt}>
      <FlexBetween padding="1.2rem" width="100%">
        <Typography fontWeight="bold" fontSize="clamp(1rem,2rem,2.5rem)" color="primary" onClick={()=>navigate("/")}
        sx={{
          "&:hover":{
            color:primaryLight,
            cursor:"pointer"
          }
        }}
        >
          Sociopedia
        </Typography> 
        
        {isNonMobileScreen &&(
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
              <InputBase placeholder="Search..."/>
              <IconButton>
                <Search/>
              </IconButton>
          </FlexBetween>
        )}

        {isNonMobileScreen ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={()=>dispatch(setMode())}>
              {theme.palette.mode==="dark" ? (
                <DarkMode sx={{fontSize:"25px"}}/>
              ):
              (
                <LightMode sx={{color: dark , fontSize:"25px"}}/>
              )}
            </IconButton>
            <Message sx={{fontSize:"25px"}}/>
            <Notifications sx={{fontSize:"25px"}}/>
            <Help sx={{fontSize:"25px"}}/>
            <FormControl variant="standard" value={name}>
              <Select value={name}
              sx={{
                backgroundColor: neutralLight,
                width : "150px",
                borderRadius:"0.25rem",
                padding:"0.25rem 1rem",
                "& .MUIsvgIcon-root":{
                  pr:"0.25rem",
                  width:"3rem"
                },
                "& .MUISelect-selsect:focus":{
                  backgroundColor:neutralLight
                }
              }}
              input={<InputBase/>}
              >
                <MenuItem value={name} >
                   <Typography>
                    {name}
                   </Typography>
                </MenuItem>
                <MenuItem onClick={()=> {dispatch(setLogout())
                navigate("/login")}}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton onClick={()=>setIsMobileMenu(!isMobileMenu)}>
            <Menu />
          </IconButton>
        )}

        {!isNonMobileScreen && isMobileMenu && (
          <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          backgroundColor={background}
          >
            <Box
            display="flex"
            justifyContent="flex-end"
            p="1rem"
            >
               <IconButton onClick={()=>setIsMobileMenu(!isMobileMenu)}>
               <Close />
              </IconButton>
            </Box>
              {/* MENU ITEMS */}
            <FlexBetween DISPLAY ="flex" flexDirection="column" justifyContent="center"  alignItems="center" gap="3rem">
            <IconButton onClick={()=>dispatch(setMode())} sx={{fontSize:"25px"}}>
              {theme.palette.mode==="dark" ? (
                <DarkMode sx={{fontSize:"25px"}}/>
              ):
              (
                <LightMode sx={{color: dark , fontSize:"25px"}}/>
              )}
            </IconButton>
            <Message sx={{fontSize:"25px"}}/>
            <Notifications sx={{fontSize:"25px"}}/>
            <Help sx={{fontSize:"25px"}}/>
            <FormControl variant="standard" value={name}>
              <Select value={name}
              sx={{
                backgroundColor: neutralLight,
                width : "150px",
                borderRadius:"0.25rem",
                padding:"0.25rem 1rem",
                "& .MUIsvgIcon-root":{
                  pr:"0.25rem",
                  width:"3rem"
                },
                "& .MUISelect-selsect:focus":{
                  backgroundColor:neutralLight
                }
              }}
              input={<InputBase/>}
              >
                <MenuItem value={name} >
                   <Typography>
                    {name}
                   </Typography>
                </MenuItem>
                <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>

          </Box>
        )}
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar
