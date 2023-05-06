import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// import UserWidget from "scenes/widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
       
        {
    user ? <>
<div className="d-flex justify-content-between align-items-between flex-column">

<h1 className="text-success">Welcom ,<span className="text-danger">{`${user.username}`}</span></h1><br/>
<h2 className="text-success"> my Email is : <span className="text-danger">{`${user.email}`}</span></h2><br/>
<h3 className="text-success">Your-Provider is:<span className="text-danger">{`${user.provider}`}</span></h3>
  my profile image  <img src={user?.image?.secure_url} alt=""  style={{width:"100px" , height:"100px"}}/>
</div>

    </>:<>
    <h1 className="text-danger">Please login fist</h1>
    </>
  }
        

      </Box>
   
  );
};

export default HomePage;
