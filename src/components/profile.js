import React from 'react'
import {useState,useEffect} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import { useHistory,useParams} from 'react-router-dom';
import "./profile.css"
import { MDBContainer, MDBRow, MDBCol,
  MDBCard,MDBBtn } from "mdbreact";

import { ReactSession } from 'react-client-session';

const Profile = () => {
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [birth, setBirth]=useState('');
    const [country, setCountry]=useState('');
    const {id}=useParams();
   
    const history=useHistory();
    useEffect(()=>{
        getProfile();
    },[]);

    const getProfile = async ()=>{
    const devEnv=process.env.NODE_ENV !== "production";
    const {REACT_APP_DEV_URL,REACT_APP_PROD_URL} =process.env;
        const response= await axios.get(`${devEnv  ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/customer/${id}`,)
        console.log(response.status);
        console.log(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setBirth(response.data.birth);
        setCountry(response.data.country);
    }
    const token=ReactSession.get("login");
    console.log(token);
  
    if(token!="true"){
        history.push('/')
        return(<div style={'height:100'}></div>);
    }
  return (
    <div class="container column is-20" >
     <nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><Link to={`/home`}>Home</Link></li>

    <li><Link to={`/customers`}>Customer List</Link></li>
    <li><Link to={`/customers/${id}`}>Detail</Link></li>
    </ul>
    </nav>
    <MDBCard className='mt-5 column is-10'>
      <MDBCol>
      <MDBRow className='mb-2'>
        <center><MDBCol> <img src="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png" width={90} height={100}></img></MDBCol></center>
      </MDBRow>
      <MDBRow>
      <center> <MDBCol><h3 className='is-size-2'>{name}</h3></MDBCol></center>
      </MDBRow>
      <MDBRow>
      <center>  <MDBCol><h3 className='is-size-2'>{email}</h3></MDBCol></center>
      </MDBRow>
     
      <MDBRow>
      <center>  <MDBCol><h3 className='is-size-2'>{birth}</h3></MDBCol></center>
      </MDBRow>


      <MDBRow>
      <center>  <MDBCol><h3 className='is-size-2'>{country}</h3></MDBCol></center>
      </MDBRow>

      </MDBCol>
      </MDBCard>
      
  </div>
  )
}

export default Profile