import React from 'react';
import {CustomChat, FacebookProvider} from "react-facebook";

const Facebook = () => {
 return(
   <FacebookProvider appId={'3166937310107503'} chatSupport>
      <CustomChat pageId={'61555349290602'}/>
   </FacebookProvider>
 )
}
export default Facebook;