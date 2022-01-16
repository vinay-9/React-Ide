import React from 'react'
import axios from 'axios'

function Submissions(props) {
    const [submissions, setSubmissions]= React.useState([])
    React.useEffect(()=>{
        getSubmissions()
    }, [props.is_submitted])
    const getSubmissions= () =>{
        console.log("getting Submissions");
        axios.get(`/api/submit`,  {
            user_id: props.id
          })
        .then(function (response) {
            console.log(response);
            setSubmissions(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    if(submissions.length===0)
        return <div className= "font-22 text-center text-primary fst-italic">"No submissions Yet!!" </div>
    return (
        <div className= "w-100 sm-100 align-items-center mt-0 py-2 bg-white " >
            <h1 className= "text-center py-2 mt-2">Your Submissions</h1>
            {/* <button className= "btn btn-seuare-outline" onCLick= {getSubmissions}>get</button> */}
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Input</th>
                    <th scope="col">Output</th>
                    <th scope="col">Execution Time</th>
                    <th scope="col">TimeStamp</th>
                    </tr>
                </thead>
                <tbody>
                   {submissions.map((result, index) =>{
                        return (
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{result.code}</td>
                            <td>{result.input}</td>
                            <td>{result.output}</td>
                            <td>{result.executiion_time}</td>
                            <td>{result.time_stamp}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
        </div>
    )
}

export default Submissions
