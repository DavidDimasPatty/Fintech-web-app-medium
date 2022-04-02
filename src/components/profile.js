import React, {useState, useEffect} from "react";
import {ReactSession} from "react-client-session";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [country, setCountry] = useState("");
  const [filename, setfilename] = useState("");
  const [video, setvideo] = useState("");
  const [passnum, setpassnum] = useState("");
  const [occupation, setoccupation] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [status, setstatus] = useState("");
  const {id} = useParams();
  
  useEffect(() => {
    getProfile();
  }, []);
  
  function download(links) {
    const link = document.createElement("a");
    link.href = links;
    link.target = "__blank"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  const getProfile = async () => {
    const devEnv = process.env.NODE_ENV !== "production";
    const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;
    const response = await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/customer/${id}`,)
    // console.log(response.status);
    // console.log(response.data);
    setName(response.data.name);
    setEmail(response.data.email);
    setBirth(response.data.birth);
    setCountry(response.data.country);
    setfilename(response.data.filename);
    setvideo(response.data.videourl);
    setpassnum(response.data.passnum);
    setoccupation(response.data.occupation);
    setaddress(response.data.address);
    setphone(response.data.phone);
    setstatus(response.data.status);  
  }
  
  const token = ReactSession.get("login");
  // console.log(token);
  
  if(token != "true") {
    history.push("/");
    return(
      <div style={"height:100"}></div>
    );
  }
  
  return (
  
    <div className="container column is-20">
      
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/customers">Customer List</a></li>
          <li><a href={`/customers/${id}`}>Detail</a></li>
        </ul>
      </nav>

      <div className="cardContainer mt-5 column is-10">
        
        <center>
          <img className="profileImage" src="https://freepikpsd.com/file/2019/10/default-profile-image-png-1-Transparent-Images.png"/>
          <div className="is-size-2">{name}</div>
          <div className="is-size-2">{email}</div>
          <div className="is-size-2">{birth}</div>
          <div className="is-size-2">{country}</div>
          <div className="is-size-2">{passnum}</div>
          <div className="is-size-2">{phone}</div>
          <div className="is-size-2">{address}</div>
          <div className="is-size-2">{occupation}</div>
          <div className="is-size-2">Status: {status}</div>
          <div className="is-size-2">Passport PDF:</div>
          <button color="info is-small" onClick={() => { download(filename) }}>Download Passport</button>
          <div className="is-size-2">Video 5 sec of customer:</div>
          <button color="info is-small" onClick={() => { download(video) }}>Download Video</button>
        </center>
        
      </div>
    
    </div>
    
  )

}

export default Profile;