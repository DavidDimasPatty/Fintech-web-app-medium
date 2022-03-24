import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory,useParams,Link} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol,
  MDBCard,MDBBtn } from "mdbreact";
  import { Button,Section } from 'react-bulma-components';
  import moment from "moment";


import 'bulma/css/bulma.min.css';
const Mail2 = () => {
  const [video, setvideo]=useState('');
  const history=useHistory();
  const date_create= moment().format("DD-MM-YYYY hh:mm:ss")
  const {url_mail}=useParams();

  const {username}=useParams();

  useEffect(() => {
    checkemail();
  }, []);

    const checkemail=async(e)=>{
      const devEnv=process.env.NODE_ENV !== "production";
      const {REACT_APP_DEV_URL,REACT_APP_PROD_URL} =process.env;
      await axios.get(`${devEnv  ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/mail_url`,{
        params:{
          url:url_mail
        }  
      
      })
      .then((respon)=>{
        
        if(respon.data.length==0){   
          history.push('/error')
          return("blank");
          
        }
        
     }).catch((err) => console.log(err));
    }

    
     

   
  return (
    <center>
    <MDBContainer size="12" >
      <MDBCard className='mt-5 column is-6'>
    <MDBCol>
    <MDBRow className='mb-2'>
      <MDBCol><h2 className='is-size-2'>Form</h2></MDBCol>
    </MDBRow>
    <MDBRow>
      <MDBCol>Video of yourself (5 seconds maximum)</MDBCol>
    </MDBRow>
    <MDBRow>
      <MDBCol><input className="input "
                     type="file"
                     placeholder="username"
                     accept="video/mp4,video/x-m4v,video/*"
                     value={video}
                     onChange={(e) =>setvideo(e.target.value)}
                     /></MDBCol>
    </MDBRow>
   
    <MDBRow className='mt-2 pb-4'>
      <MDBCol>
    
     <Link to={`/mail3/${url_mail}/${username}`} className='button is-small is-info'>Next</Link> 
  
        </MDBCol>
     </MDBRow>
    </MDBCol>
    </MDBCard>
  </MDBContainer>
            
    </center>  
            
  )
}

export default Mail2