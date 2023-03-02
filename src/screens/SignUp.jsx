import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [ credentials , setCredentials] = useState({name:"",email:"",password:"",location:""});
    let navigate = useNavigate()
    const handelSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
           method:'POST',
           headers:{
            'Content-Type': 'application/json'
           }, body:JSON.stringify({
            name:credentials.name,
            email:credentials.email,
            password:credentials.password,
            location:credentials.location
           })
        });
        const json = await response.json();

        if(!json.success){
            alert("Enter valid Credentials")
        }
        if (json.success) {
            navigate('/')
        }
    }

    const onchange=(e)=>{
        setCredentials({...credentials , [e.target.name]:e.target.value})
    }
    return (
        <>
            <div className="container mt-5">
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' value={credentials.name}  onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" className="form-control" id="location" name='location' value={credentials.location} onChange={onchange}/>
                    </div>
                    <button type="submit" className="btn text-white btn-success">Signup</button>
                    <Link to="/login" className="m-3 text-white btn btn-success">Already an user</Link>
                </form>
            </div>
        </>
    )
}

export default SignUp
