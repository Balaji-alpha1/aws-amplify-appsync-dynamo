import './App.css';
import config from './aws-exports'
import {API} from 'aws-amplify'
import * as queries from './graphql/queries'
import * as mutation from './graphql/mutations'
import { useEffect, useState } from 'react';

function App() {

  useEffect(()=>{
      fetchData()
  },[])

  const [listItems,setListItems] = useState([]);
  const [name,setName] = useState('');
  const [des,setDes] = useState('');

  const fetchData = async () => {
    let response = await API.graphql({query: queries.listNotifications })
    console.log(response)
    setListItems(response?.data?.listNotifications?.items)
  }

  const addData = async () => {
    let res = await API.graphql({
      query: mutation.createNotification,
      variables:{
        input:{
          name,
          description: des
        }
      }
    })
    console.log(res)
    await fetchData()
  }

  return (
    <>
    <div>
       ToDo App
    </div>
    <div>
      <input placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
      <input placeholder='description' value={des} onChange={(e)=>{setDes(e.target.value)}}/>
      <button onClick={addData}>Add Data</button>
    </div>
    <div>
      {listItems.map((value,i)=>(
        <li key={i}>
          {value.name} - {value.description}
        </li>
      ))}
    </div>
    </>
  );
}

export default App;
