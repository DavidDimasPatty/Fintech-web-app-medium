import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory,useParams} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol,
  MDBCard,MDBBtn } from "mdbreact";
  import { Button,Section } from 'react-bulma-components';
  import moment from "moment";


import 'bulma/css/bulma.min.css';
const CompleteSurvey = () => {
    const history=useHistory();
  const {url_mail}=useParams();

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
            Thank you for filling this survey!
    </MDBCard>
  </MDBContainer>
            
    </center>  
  )
}

export default CompleteSurvey