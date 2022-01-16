import React ,{ useState} from 'react'
import {Link } from 'react-router-dom';
import { connect } from 'react-redux'
import "./login.css";
import 'bootstrap/dist/css/bootstrap.css';
import back from './background.png'
import axios from 'axios'

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [type, setType]= useState("login")
    const [error, setError] = useState(null)

    const login= e=>{
        e.preventDefault();
        console.log("calling LogIn");
        axios.post('/api/login', {email: email, password: password})
        .then(function (response) {
            console.log(response);
            props.addId(response.id)
            setEmail("")
            setPassword("")
            window.location.href= "/"
        })
        .catch(function (error) {
            console.log(error);
            setError("Invalid UserName of Password!! make sure you are already registered")
        });
    }

    const register= e=>{
        e.preventDefault();
        console.log("calling signIn");
        axios.post('/api/signin', {name: fullName, password: password, email: email})

        .then(function (response) {
            console.log(response);
            setEmail("")
            setPassword("")
            setFullName("")
            console.log(response.data.insertedId)
            props.addId(response.data.insertedId)
            window.location.href= "/"
            // window.location.href= "/"
        })
        .catch(function (error) {
            console.log(error);
            setError("This user already exists or osme error in login.. try again later")
        });
    }

  
    return (
        <>
        <img src= {back} alt= "backgorund_image"/>
        <section className="h-100 gradient-form" >
        <div className="text-center">
            <h1 className= "mt-5 mb-0 fw-bold font-22">Welcome to CodeBox💻</h1>
        </div>
        <div className="container mt-0 py-5 h-100">
          <div className="row d-flex mx-auto justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">Login</h4>
                      </div>
      
                      <form>
                        <p>Please login to your account</p>

                        {type==="register" && <div className="form-outline mb-4">
                          <input type="email" id="form2Example11" className="form-control"
                          value= {fullName} onChange= {(e)=>setFullName(e.target.value)} placeholder="Phone number or email address"/>
                          <label className="form-label" for="form2Example11">Full Name</label>
                        </div>}

                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example11" className="form-control"
                          value= {email} onChange= {(e)=>setEmail(e.target.value)} placeholder="Enter email address"/>
                          <label className="form-label" for="form2Example11">Email</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input value= {password} onChange= {(e)=>setPassword(e.target.value)} type="password" id="form2Example22" className="form-control" />
                          <label className="form-label" for="form2Example22">Password</label>
                        </div>
      
                        {type==="login" && <><div className="text-center pt-1 mb-2 pb-1">
                          <button className="btn btn-primary btn-block fa-lg bg-secondary mb-3 col-3 mx-2" type="button" onClick={login}>Log in</button>
                          <a className="text-muted" href="#!">Forgot password?</a>
                        </div>
      
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" onClick= {(e)=>setType("register")} className="btn btn-outline-success col-5">Create new</button>
                        </div>
                        </>
                        }
                        {type==="register" && <div className="d-flex align-items-center justify-content-center pb-4">
                          <button type="button" onClick= {(e)=>register(e)} className="btn btn-outline-success col-5">Register</button>
                        </div>}
                        <div className= "text-danger">
                            {error!== null && error}
                        </div>
                      </form>
      
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-1">
                    <div className="text-muted px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  
        </>
    )
}
const mapStateToProps = (state) => {
	return {
		id: state.general.id,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addId: (id) => {
			dispatch({ type: 'ADD_ID', id:id  })
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
