import React, { useEffect, useState } from 'react';
import './App.css'
import Head from './components/Head';
import DataAdder from './components/DataAdder';
import ShowData from './components/ShowData';
import axios from 'axios';

const App = () => {
  const [item, setItem] = useState({ data: '' });
  const [addData, setAddData] = useState([]);
  const [holderText, setHolderText] = useState("Add Item");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000`)
      .then((res) => {
        console.log(res, "res");
        if (Array.isArray(res.data)) {
          setAddData(res.data);
          setDeleted(false);
        } else {
          console.log('Invalid data format:', res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, [item, deleted]);


  const addItem = () => {
    if (item.data !== "") {
      axios
        .post(`http://localhost:8000`, item)
        .then((res) => {
          setItem({ data: '' });
          setHolderText("Add Item");
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log("Error couldn't add Item");
          console.error(err.message);
        });
    } else {
      setHolderText("Can't Empty");
    }
  }

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8000/${id}`);
    setDeleted(true);
  }

  return (
    <>
      <div className="container">
        <div className="center_container">
          <Head />
          <div className="body">
            <DataAdder item={item} setItem={setItem} click={addItem} placeholderText={holderText} />
            <ol className="lists">
              {
                addData.length > 0 &&
                addData.map((item) => {
                  return <ShowData key={item._id} item={item} onSelect={deleteItem} />
                })
              }

            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;