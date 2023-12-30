import { Box , useMediaQuery} from "@mui/material"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "scenes/Navbar/Navbar"
import AdvertWidget from "scenes/widgets/AdvertWidget"
import FriendList from "scenes/widgets/FriendList";
import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget"

const HomePage = () => {
  const isNonMobile=useMediaQuery("(min-width:1000px)")
  const user=useSelector((state)=>state.user);
  const token=useSelector((state)=>state.token);
  const navigate = useNavigate();
  if(!token){
    navigate("/login")
  }

   
  return (
    <div>
      {user && 
      <>
      <Navbar />
    <Box
    width="100%"
    display={isNonMobile? "flex": "block"}
    gap="0.5rem"
    padding="1.2rem 6%"
    justifyContent="space-between"
    marginTop="1rem">
      <Box flexBasis={isNonMobile?"26%": undefined}>
        <UserWidget userId={user._id } />
      </Box>
      <Box flexBasis={isNonMobile?"42%": undefined}
      mt={isNonMobile?undefined:"2rem"}>
        <MyPostWidget picturePath={user.picturePath }/>
        <PostsWidget userId={user._id } isProfile={false}/>
      </Box>
      {isNonMobile && 
      <Box flexBasis={isNonMobile?"26%": undefined} display={"flex"}
      flexDirection={"column"}
      gap={"1.5rem"}>
        <AdvertWidget />
        <FriendList userId={user._id}/>
      </Box>
    }
      
    
    </Box>
    </>
    }
   {
    !user && <Navigate to={"/login"}/>
  }
    </div>
  )
}

export default HomePage