import "codemirror/lib/codemirror.css";
import {Link } from 'react-router-dom';
import { connect } from 'react-redux'
import React, { useState, useEffect, ReactDOM } from 'react';
// import CodeMirror from '@uiw/react-codemirror';
import { Form, TextArea } from 'semantic-ui-react'
import {Controlled as ControlledEditor} from 'react-codemirror2'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import { TextField } from '@mui/material';
import Submissions from './submissions'
import back from './background.png'
import { NavLink } from "react-router-dom";
import './CodeBox.css'
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/dracula.css';

require('codemirror/mode/javascript/javascript');
const axios= require('axios');

function CodeBox(props) {
    
    
    const [code, setcode] = useState(`       #include <iostream>
        using namespace std;

        int main() {
        cout << "Hello World!";
        return 0;
        }`);
    // 54= C++, 62=Java
    const [mode, setmode] = useState(54)
    const [token, settoken]= useState("");
    const [result, setresult]= useState("")
    const [input, setinput]= useState("");
    const [is_submitted, setIsSubmitted]= useState(0);

    const inputProps = {
        step: 300,
      };

    React.useEffect(()=>{
        if(is_submitted){
            console.log("submitted")
        }
    }, [is_submitted])
    React.useEffect(()=>{
        
    }, [])
    const handleChange=(editor, data, value)=>{
        setcode(value)
        console.log(code)
    }
    const logout = ()=>{
        localStorage.clear()
        window.location.href= "/"
    }
    const handleChangeMode = (data)=>{
        data==="C++"? setmode(54) : setmode(62)
        data==="C++"? 
            setcode(`#include <iostream>
                    using namespace std;

                    int main() {
                    cout << "Hello World!";
                    return 0;
                    }`)
            :setcode(`public class Main {
                    public static void main(String[] args) {
                        System.out.println("Hello World");
                }
              }`)
        
    }
   
    //submit code to the api (custom)
    const submitCode= (data)=>{
        console.log("submitting to mongoDb");
        axios.post('/api/submit', {user_id: props.id, code: data.source_code,  output: data.stdout?data.stdout:data.status.desctiption, input: data.stdin, execution_time: data.time,  submitted_at: data.finished_at})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    //executing the code 
    const executeCode =  async ()=>{
        var options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {base64_encoded: 'false', wait: 'true', fields: '*'},
            headers: {
                'content-type': 'application/json',
                //'x-rapidapi-key': '098ff97f16mshec4444d56e91a23p14d2edjsn79769e2abfde',
                'x-rapidapi-key': 'bd7cf329bemshae8e6053840605ep166442jsnc60488059d95',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            },
            data:JSON.stringify({
                source_code: code,
                stdin:input,
                language_id: mode,
              }),
        };
        await axios.request(options).then(function (response) {
            console.log(response.data.token);
            settoken(response.data.token)
            setmode(response.data.language_id)
            console.log(mode)
            //getting the results
            getExecutedCodeandSubmit();

        }).catch(function (error) {
            console.log("error from submission")
            console.error(error);
        });                
    }
    const getExecutedCodeandSubmit= async ()=>{
        var getoptions = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {base64_encoded: 'false', fields: '*'},
            headers: {
                // 'x-rapidapi-key': '098ff97f16mshec4444d56e91a23p14d2edjsn79769e2abfde',
                'x-rapidapi-key': 'bd7cf329bemshae8e6053840605ep166442jsnc60488059d95',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            }
        };
        setresult("Waiting for the results..........")
        await axios.request(getoptions).then(function (response) {
            console.log(response.data," from the url ", getoptions.url)
            response.data.status.description=== "Accepted"?
            setresult(response.data.stdout):
            setresult(response.data.status.description)
            console.log(result)
            submitCode(response.data)

        }).catch(function (error) {
            console.log("error from get +", error, "url \n ",getoptions.url);
        });
    }

    return (
        <div className= "font-22 ">
        <img alt= "background_image" className= "img" src={back}/>
        <div className="text-center">
            <h1 className= "mt-5 mb-0 fw-bold font-22">Welcome to CodeBox💻</h1>
            {props.id=== "" ? <NavLink className= "btn btn-text mx-auto border-2 " to= '/login'><i className= "bi bi-play-fill" />click here to Login</NavLink>:
            <> 
            <button class ="btn btn-text border-2 "onClick= {()=>{logout()}}> Click here to logout </button>
            </>}
        </div>
        
        <div className= "container_js">
            <div className="navbar_js">
                <select className="select_js" 
                name="select" 
                onChange={(e)=>{
                    handleChangeMode(e.target.value);
                    console.log(mode);
                    e.preventDefault()
                }}>
                    <option value="C++"> C++</option>
                    <option value="Java"> Java</option>
                </select>

             <CodeMirror
                onChange={
                    handleChange              
                }
                value= {code}
                className= "code-mirror-wrapper"
                autoCursor= {false}
                options={{
                    lineWrapping: true,
                    theme : "dracula",
                    keyMap: 'sublime',
                    tabSize: 4,
                    lint: true,
                    mode: mode===54? "C++": "Java",
                    lineNumbers: true,
                }}
                ></CodeMirror>
                <button 
                className= "btn btn-danger text-light font-22 py-0 px-3  mb-2"
                data-bs-toggle="tooltip" data-bs-placement="bottom" title="Double click to run"
                onClick={()=>{
                    executeCode();
                }}> <i class="bi bi-play-fill"></i> Run </button>
               

                <h3> Input </h3>
                <TextArea  
                    name="input" 
                    value= {input}
                    inputProps= {inputProps}
                    onChange={(e)=>{
                        e.preventDefault()
                        setinput(e.target.value)}}
                    className="input_js w-100"
                
                />

                <h3> Output </h3>
                <iframe 
                    className= "iframe"
                    srcDoc= {result}
                    title = "output"
                    sandbox= "allow-scripts"
                    width= "100%"
                    height= "100%"
                >

                </iframe>
                <Submissions is_submitted= {is_submitted} {...props}/>
            </div>  
            
        </div>
        </div>
    )
}


const mapStateToProps = (state) => {
	return {
		id: state.general.id,
	}
}
export default connect(mapStateToProps, null)(CodeBox)
