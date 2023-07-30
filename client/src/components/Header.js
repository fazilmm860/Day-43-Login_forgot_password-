import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const {logindata,setLoginData}=useContext(LoginContext);
    const history= useNavigate()
;
const [anchorE1,setAnchorE1]=useState(null);

const open=Boolean(anchorE1);

const handleClick=(event)=>{
    setAnchorE1(event.currentTarget);   
}
const handleClose=()=>{
    setAnchorE1(null);
}
const logoutuser=async()=>{
    let token=localStorage.getItem("userdatatoken");

    const res=await fetch("/logout",{
        method:"GET",
        headers:{
            "Context-Type":"application/json",
            "Authorization":token,
            Accept:"application/json"
        },
        credentials:"include"
        
    })
    const data=await res.json();
    console.log(data);
    
    if(data.status ===201){
        console.log("user Logout");
        localStorage.removeItem("userdatatoken");
        setLoginData(false)
        history("/");
    }else{
        console.log("error");
    }
}
const goDash=()=>{
    history("/dash")
}

const goError=()=>{
    history("*")
}
    return (
        <>
        <header>
            <nav>
                <NavLink to="/"><h1>Dashbord</h1></NavLink>
                <div className="avatar">
                    {
                      logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                      <Avatar style={{ background: "blue" }} onClick={handleClick} />



                    }
                </div>
                <Menu 
                  id="basic-menu"
                  anchorEl={anchorE1}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={
                    {
                        'aria-labelledby':'basic-button',
                    }
                  }
                  >
                    {
                        logindata.ValidUserOne ? (
                            <>
                            <MenuItem onClick={()=>{
                                goDash()
                                handleClose()
                            }}>Logout</MenuItem>
                            </>
                        ):(
                            <>
                            <MenuItem onClick={()=>{
                                goError()
                                handleClose()
                            }}>Profile</MenuItem>
                            </>
                        )
                    }
                  </Menu>
            </nav>
        </header>

        </>
    )
}

export default Header
