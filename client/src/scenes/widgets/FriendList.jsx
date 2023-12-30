import { Box,Typography,useTheme } from "@mui/material";
import Friend from "./Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setFriends } from "state";
import { useNavigate } from "react-router-dom";


const FriendList = ({userId}) => {

    const {palette}=useTheme();
     const dispatch= useDispatch();
     const theme = useTheme();
     const {token}=useSelector((state)=>state.token)
     const friends=useSelector((state)=>state.user.friends)
     const getFriends=async()=>{
        const response = await fetch(`http://localhost:3001/user/${userId}/friends`,{
            method:"GET",
            headers:{ Authorization : `Bearer ${token}`}
        })
        const data = await response.json();
        dispatch(setFriends({friends: data}))
     }
     useEffect(()=>{
        getFriends();
     },[])
  return (
    <WidgetWrapper>
        <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500" 
        sx={{mb:"1.5rem"}}>
            Friend List
        </Typography>
        <Box 
        display={"flex"}
        flexDirection={"column"}
        gap={"1.5rem"}>
            {friends.map((e)=>
            <Friend 
            key={e._id}
            friendId={e._id}
            name={`${e.firstName} ${e.lastName}`}
            subtitle={e.occupation}
            userPicturePath={e.picturePath}
            />)}
        </Box>
    </WidgetWrapper>
  )
}

export default FriendList
