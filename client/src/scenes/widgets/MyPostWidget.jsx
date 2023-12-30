import WidgetWrapper from "components/WidgetWrapper"
import {
     EditOutlined,
     DeleteOutlined,
     AttachFileOutlined,
     GifBoxOutlined,
     ImageOutlined,
     MicOutlined,
     MoreHorizOutlined,
    
    } from "@mui/icons-material"
import { Box,Typography,Divider,InputBase,Button,useTheme ,IconButton,useMediaQuery} from "@mui/material"
import Dropzone from "react-dropzone"
import FlexBetween from "components/FlexBetween"
import UserImage from "components/UserImage"
import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { setPosts } from "state"

const MyPostWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [isImage , setIsImage]= useState(false)
    const [image,setImage]=useState(null)
    const [post,setPost]=useState("")
    const {palette}=useTheme();
    const {_id}=useSelector((state)=> state.user)
    const token=useSelector((state)=> state.token)
    const isNonMobile=useMediaQuery("(min-width:1000px)")
    const medium = palette.neutral.medium;
    const mediumMain = palette.neutral.mediumMain;

    const handlePost = async()=>{
        const formData= new FormData();
        formData.append("userId",_id);
        formData.append("description",post);
        if(image){
            formData.append("picture",image);
            formData.append("picturePath",image.name);
        }

        
        const response = await fetch("http://localhost:3001/post/create",{
            method:"POST",
            headers:{ Authorization : `Bearer ${token}`},
            body:formData
        })
        const posts=await response.json();
        console.log(posts)
        dispatch(setPosts({posts}));
        setImage(null)
        setPost("") 
    }
    const size="30px"
  return (
    <WidgetWrapper>
        <FlexBetween gap="1.5rem" mb="1rem">
            
            <UserImage image={picturePath}/>
            <InputBase
            placeholder="what's on your mind?"
            onChange={(e)=>{
                setPost(e.target.value)
                
            }}
            value={post}
            sx={{
                width:"100%",
                backgroundColor: palette.neutral.light,
                borderRadius:"2rem",
                padding:"1rem 2rem "
            }}
            />

           
        </FlexBetween>
        {isImage &&
            <Box 
            border={`1px solid ${palette.neutral.medium}`}
            borderRadius="5px"
            gridColumn="span 2"
            p="1rem"
            mb="1rem" 
            
        >
          <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles)=>
            setImage(acceptedFiles[0])}
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
                {!image ? (<p>Drag and drop a file here, or click to select a file</p>):
                ( <FlexBetween>
                  <Typography>{image.name}</Typography>
                  <EditOutlined />
                </FlexBetween>)}
                
              </Box>
            )}
          </Dropzone>
        </Box>
            } 
        <Divider/>
        {isNonMobile?
        <FlexBetween m="1rem 0"
        onClick={(e)=>{
            setIsImage(prev=> !prev)
       }}
       sx={{"&:hover":{ cursor:"pointer"}}}>
        <FlexBetween>
            <ImageOutlined  sx={{ color: medium }}/>
            <Typography color={medium}>
                Image
            </Typography>
        </FlexBetween>
        <FlexBetween>
            <GifBoxOutlined  sx={{ color: medium }}/>
            <Typography color={medium}>
                Clip
            </Typography>
        </FlexBetween>
        <FlexBetween>
            <AttachFileOutlined sx={{ color: medium }}/>
            <Typography color={medium}>
                Attachment
            </Typography>
        </FlexBetween>
        <FlexBetween>
            <MicOutlined sx={{ color: medium }} />
            <Typography color={medium}>
                Audio
            </Typography>
        </FlexBetween>
        <Button backgroundColor="primary"
        disabled={!post}
        onClick={handlePost}
        >
            Post
        </Button>
    </FlexBetween>:
        <FlexBetween gap="0.25rem" mt="1rem">
            <MoreHorizOutlined sx={{ color: medium }} />
        </FlexBetween>
    }
    </WidgetWrapper>
    )
}

export default MyPostWidget