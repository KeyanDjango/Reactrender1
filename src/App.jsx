import axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function App() {
  const [task, setTask] = useState({
    taskid: '',
    taskname: ''
  });

  const [todoData, setData] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;

    setTask({
      ...task,
      [name]: value
    });


  }

  // Submited happend
  async function handleSubmission(e) {
    e.preventDefault();
    try {
      // const response = await axios.post('http://127.0.0.1:8000/api/create'
      // const response = await axios.post('http://127.0.0.1:8000/api/create'
      const response = await axios.post('https://djangorender1-trh2.onrender.com/api/create', {
        taskid: task.taskid,
        taskname: task.taskname
      });
      alert('Data saved successfully');
      setTask({
        taskid: '',
        taskname: ''
      });
      retriveData();
    } catch (error) {
      console.log(error);

    }

  }

  // Retrive Data
  async function retriveData() {
    // const response = await axios.get('http://127.0.0.1:8000/api/create')
    const response = await axios.get('https://djangorender1-trh2.onrender.com/api/create')

    // console.log(response.data);

    setData(response.data);
    console.log(response.data);

  }

  useEffect(() => {
    retriveData();
  }, []);

  // Data Delete
  async function handleDelete(id) {
    try {
      const response = await axios.delete(`https://djangorender1-trh2.onrender.com/api/delete/${id}`);
      // const response = await axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`);
      retriveData();
      alert('Data  deleted successfully')
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>

      <form onSubmit={handleSubmission}>

        <label>Task id</label> <br />
        <input type='text' name='taskid' value={task.taskid} onChange={handleChange} /> <br />
        <label>Task name</label> <br />
        <input type='text' name='taskname' value={task.taskname} onChange={handleChange} /> <br />
        <input type='submit' value='Submit' />
        <input type='reset' value='Reset' />
      </form>

      <table border='1px solid black'>
        <thead>
          <tr>
            <td>TaskId</td>
            <td>TaskName</td>
          </tr>
        </thead>
        <tbody>


          {todoData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.taskid}</td>
                <td>{item.taskname}</td>
                <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
              </tr>
            )

          })}


        </tbody>
      </table>
    </>
  );
}