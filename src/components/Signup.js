import React, {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            props.showAlert("Sign Up Succesfull", "success")

        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container mt-2'>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control mt-2" id="name" name="name" onChange={onChange} placeholder="Enter email"/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control mt-2" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="password">Create Password</label>
                    <input type="password" className="form-control mt-2" id="password" name="password" onChange={onChange}  placeholder="Create Password" minLength={5} required/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control mt-2" id="cpassword" name="cpassword" onChange={onChange}  placeholder="Confirm Password"minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup