import { Box,useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import FriendList from "../widgets/FriendList"
import MyPostWidget from "../widgets/MyPostWidget"
import PostsWidget from "../widgets/PostsWidget"
import UserWidget from "../widgets/UserWidget"
import state from "state"



const ProfilePage = () => {
    const [user,setUser]=useState(null)
    const {userid}= useParams();

    const token = useSelector((state)=>state.token)
    const isNonMobile=useMediaQuery("(min-width:1000px)")
    const getUser=async()=>{
        const response = await fetch(`http://localhost:3001/user/${userid}`,{
            method:"GET",
            headers:{ Authorization : `Bearer ${token}`}
        })
        const data = await response.json();
        setUser(data)
     }
     useEffect(()=>{
        getUser();
     },[])
     if(!user) return null;
  return (
    <Box>
        <Navbar />
        <Box
            width="100%"
            display={isNonMobile? "flex": "block"}
            gap="2rem"
            padding="1.2rem 6%"
            justifyContent="center"
            marginTop="1rem">
      <Box flexBasis={isNonMobile?"26%": undefined}>
        <UserWidget userId={userid}/>
        <Box m="2rem 0">
            <FriendList userId={user._id} />
        </Box>
      </Box>
      <Box flexBasis={isNonMobile?"42%": undefined}
      mt={isNonMobile?undefined:"2rem"}>
        
        <PostsWidget userId={user._id} isProfile={true}/>
      </Box>
    </Box>
    </Box>
  )
}

export default ProfilePage