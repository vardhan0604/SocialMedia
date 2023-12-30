import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette}=useTheme();
    const main = palette.neutral.main;
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;


  return (
    <WidgetWrapper>
        <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
                Sponsored
            </Typography>
            <Typography color={medium}>
                Create Ad
            </Typography>
        </FlexBetween>
        <img
            width={"100%"} 
            height="auto"
            alt="advert"
            src="http://localhost:3001/assets/info4.jpeg"
            style={
                {borderRadius:"0.75rem",
            margin:"0.75rem 0"}
            }
            />
            <FlexBetween>
                <Typography color={main}>
                    MikuCosemetics
                </Typography>
                <Typography color={medium}>
                mikuCosemetics.com
                </Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptatem minus excepturi et rerum distinctio id consequatur, iusto ullam ipsum laudantium. Maiores laborum vero nesciunt rerum est amet quam. Perspiciatis?
            </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget