import "codemirror/lib/codemirror.css";
import React, { useState, useEffect, ReactDOM } from 'react';
// import CodeMirror from '@uiw/react-codemirror';
import { Form, TextArea } from 'semantic-ui-react'
import {Controlled as ControlledEditor} from 'react-codemirror2'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import { TextField } from '@material-ui/core';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/dracula.css';
require('codemirror/mode/javascript/javascript');
const axios= require('axios');

function CodeBox() {
    const [code, setcode] = useState(`
        #include <iostream>
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
  
    const inputProps = {
        step: 300,
      };
   
    useEffect(() => {
        mode===54? 
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
    }, [mode])
  

    const handleChange=(editor, data, value)=>{
        setcode(value)
        console.log(code)
    }

    const executeCode = async ()=>{
        // await axios.get('/').then(response=>{
        //     console.log("from backcend",response.data);
        // })
        var options = {
                method: 'POST',
                url: 'https://judge0-ce.p.rapidapi.com/submissions',
                params: {base64_encoded: 'true', wait: 'true', fields: '*'},
                headers: {
                  'content-type': 'application/json',
                  'x-rapidapi-key': '098ff97f16mshec4444d56e91a23p14d2edjsn79769e2abfde',
                  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
                },
                data:JSON.stringify({
                    // language_id:mode,
                    // source_code: 'I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=',
                    // stdin: 'SnVkZ2Uw'
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
        }).catch(function (error) {
            console.log("error from submission")
            console.error(error);
        });
// 'x-rapidapi-key': 'bd7cf329bemshae8e6053840605ep166442jsnc60488059d95',


            var getoptions = {
                method: 'GET',
                url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
                params: {base64_encoded: 'true', fields: '*'},
                headers: {
                'x-rapidapi-key': '098ff97f16mshec4444d56e91a23p14d2edjsn79769e2abfde',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
                }
            };

            await axios.request(getoptions).then(function (response) {
                console.log(response.data," from the url ", getoptions.url)
                response.data.status.description=== "Accepted"?
                setresult(response.data.stdout):
                setresult(response.data.status.description)
                console.log(result)

            }).catch(function (error) {
                console.log("error from get +", error, "url \n ",getoptions.url);
            });
    }

    return (
        <>
        <h1 align="center"> Welcome to CodeBox💻</h1>
        <div className= "container">
            <div className="navbar">
                <select className="select" 
                name="select" 
                onChange={(e)=>{
                    e.target.value==="C++"? setmode(54) : setmode(62)
                    console.log(mode);
                    e.preventDefault()
                }}>
                    <option value="C++"> C++</option>
                    <option value="Java"> Java</option>
                </select>

             <CodeMirror
                // onBeforeChange={handleChange}
                onChange={handleChange}
                value= {code}
                className= "code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    theme : "dracula",
                    keyMap: 'sublime',
                    tabSize: 4,
                    lint: true,
                    mode: mode===54? "C++": "Java",
                    lineNumbers: true
                }}
                ></CodeMirror>

                <button 
                onClick={()=>{
                    executeCode();
                }}> Submit </button>

                <h3> Input </h3>
                <TextArea  
                    name="input" 
                    value= {input}
                    inputProps= {inputProps}
                    onChange={(e)=>{
                        e.preventDefault()
                        setinput(e.target.value)}}
                    className="input"
                
                />

                <h3> Output </h3>
                <iframe 
                    srcDoc= {result}
                    title = "output"
                    sandbox= "allow-scripts"
                    width= "100%"
                    height= "100%"
                >

                </iframe>
            </div>  
        </div>
        </>
    )
}

export default CodeBox;

         