import React from 'react';
import {CustomChat, FacebookProvider} from "react-facebook";

const Facebook = () => {
 return(
   <FacebookProvider appId={'1611864669602565'} chatSupport={true}>
      <CustomChat pageId={'211272788734626'}>
      </CustomChat>
   </FacebookProvider>
 )
}
export default Facebook;