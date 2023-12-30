import { ChatBubbleOutlineOutlined , 
FavoriteBorderRounded,
FavoriteOutlined,
ShareOutlined} from "@mui/icons-material"
import { Box,Divider,IconButton,Typography,useTheme } from "@mui/material"
import Friend from "./Friend"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { setPost } from "state"



const PostWidget = (
    {postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments    }
) => {
    const[isComments,setIsComments]=useState(false);
    const dispatch= useDispatch();
    const {token}=useSelector((state)=>state.token)
    const loggedUserId=useSelector((state)=>state.user._id)
    const isLiked= Boolean(likes[loggedUserId])
    const likeCount=Object.keys(likes).length;

    const {palette}=useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main; 

    const patchLikes = async()=>{
        const response = await fetch(`http://localhost:3001/post/${postId}/like`,{
        method:"PATCH",
        headers:{ 
            Authorization : `Bearer ${token}`,
             "Content-Type":"application/json"
        },
        body: JSON.stringify({userId: loggedUserId})
    })
    const updatePost= await response.json();
    dispatch(setPost({post: updatePost}))
    }
  return (
    <WidgetWrapper m="1.2rem 0">
        <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath}/>
        <Typography mt="0.5rem">{description}</Typography>
        <Box mt="0.5rem">
        <img 
        style={{objectFit:"fill",borderRadius:"1.2rem" }} 
        width="100%" 
        height="50%"
        alt="postImg"
        src={`http://localhost:3001/assets/${picturePath}`}/>
    </Box>
    <FlexBetween mt="0.4rem">
        <Box display="flex" gap="1.3rem">
            <Box  display="flex"  alignItems="center">
            <IconButton onClick={()=>{
                patchLikes()
            }}>
            {isLiked ? <FavoriteOutlined/> : <FavoriteBorderRounded/>}

            </IconButton>
                <Typography>{likeCount}</Typography>
            </Box>
            <Box  display="flex"   alignItems="center">
            <IconButton
             onClick={()=>{
                setIsComments((prev)=>!prev)
            }}>
                <ChatBubbleOutlineOutlined/>
            </IconButton>
                <Typography>{comments.length}</Typography>
            </Box>
        </Box>
    </FlexBetween>
    {isComments && 
    <Box>
    <Divider />
       {comments.map((e)=>{
        return <Box>
            <Typography p="0.5rem 0">{e}</Typography>
            <Divider/>
        </Box>
       })}
        
       
    </Box>}
    </WidgetWrapper>
  )
}
export default PostWidget