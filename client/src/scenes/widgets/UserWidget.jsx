import{
    ManageAccountsOutlined, 
    EditOutlined,
    LocationOnOutlined, 
    WorkOutlineOutlined, 
}from "@mui/icons-material"
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box,Typography,Divider,useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import UserImage from "components/UserImage"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect,useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const UserWidget = ({userId}) => {
    const [userData,setUserData]=useState(null);
    const {palette}= useTheme();
    const navigate = useNavigate();
    const token= useSelector((state)=> state.token)
    const user= useSelector((state)=> state.user)

    // console.log(user._id)
    console.log(userId)
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const dark = palette.neutral.dark;
    const getUser = async()=>{
        const response = await fetch(`http://localhost:3001/user/${userId}`,{
            method:'GET',
            headers:{ Authorization : `Bearer ${token}`}
        })
        const data = await response.json();
        setUserData(data)
    }

    useEffect(()=>{
        getUser();
    },[])

    if(!userData){
        return null
    }

    const {
        firstName,
        lastName,
        location ,
        occupation,
        viewedProfile,
        impressions,
        friends,
        picturePath
    }= userData;

    
  return (
    <WidgetWrapper>
        <FlexBetween
        gap="0.5rem"
        pb="1rem"
        onClick={()=>navigate(`/profile/${userId}`)}>
            <FlexBetween gap="1rem">
                <UserImage image={picturePath}/>
                <Box>
                    <Typography
                    variant="h4"
                    color={dark}
                    fontWeight="500"
                    sx={{"&:hover":{
                        color: palette.primary.light,
                        cursor:"pointer"
                    }}}>
                        {firstName} {lastName}
                    </Typography>
                    <Typography color={medium}>{friends && friends.length}</Typography>
                </Box>
                
            </FlexBetween>
            <ManageAccountsOutlined/>
        </FlexBetween>
        <Divider />
        <Box
        gap="0.5rem"
        pb="1rem">

            <Box
            display= "flex"
            gap="0.5rem"
            alignItems="center"
            pt="1.2rem">
            <LocationOnOutlined/>
            <Typography color={medium}>
            {location}
            </Typography>
            
            </Box>
            <Box
            display= "flex"
            gap="0.5rem"
            alignItems="center"
            pt="0.6rem">
            <WorkOutlineOutlined/>
            <Typography color={medium}>
            {occupation}
            </Typography>
            
            </Box>
        </Box>
        <Divider />
        <Box
        gap="0.5rem"
        pb="1rem"
        pt="1.2rem">
            <FlexBetween>
                <Typography  color={medium}>Who's viewed your profile</Typography>
                <Typography >{viewedProfile}</Typography>
            </FlexBetween>
            <FlexBetween>
                <Typography  color={medium}>Impressions on your post</Typography>
                <Typography>{impressions}</Typography>
            </FlexBetween>
        </Box>
        <Divider />
        <Box
         pb="1rem"
         pt="1.2rem"
        >
            <Typography 
            fontWeight="500"
            fontSize="16px"
            mb="0.8rem"
            >
                Social Profiles
            </Typography>
            <FlexBetween 
            mb="0.5rem">
                <Box
                display= "flex"
                gap="0.5rem">
                    <TwitterIcon/>
                    <Box 
                     display= "flex"
                     flexDirection="column"
                    >
                        <Typography>Twitter</Typography>
                        <Typography color={medium}>Social Network</Typography>
                    </Box>
                </Box>
                <EditOutlined/>
            </FlexBetween>
            <FlexBetween>
                <Box
                display= "flex">
                    <LinkedInIcon/>
                    <Box 
                     display= "flex"
                     flexDirection="column"
                    >
                        <Typography>LinkedIn</Typography>
                        <Typography color={medium}>Network Platform</Typography>
                    </Box>
                </Box>
                <EditOutlined/>
            </FlexBetween>
        </Box>
    </WidgetWrapper>
  )
}

export default UserWidget

// display= "flex",
//         justifyContent="space-between",
//         alignItems="center"