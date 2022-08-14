import React, { useState } from "react";
import './App.css';
import { debounce } from "lodash";

const axios = require('axios');

export default function DebounceApp() {

  const [totalResults, setTotalResults] = useState(0)

  async function getPhotosFiltered(term) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    if(response.status === 200){
      const responseFiltered = response.data.filter(photo => photo.title.includes(term));
      console.log(responseFiltered)
      setTotalResults(responseFiltered.length)
    }
  }

  const debounceSearch = debounce(value => { 
    if(value.length){
      getPhotosFiltered(value)
    }else{
      setTotalResults(0)
    }
  }, 500);
  
  const handleChange = (e) => {
    debounceSearch(e.target.value)
  }

  return (
    <div id="content">
      <div id="input-search">
        <input onChange={(e) => handleChange(e)} placeholder="" /><br/>
        <p> {totalResults} found. </p>
      </div>
    </div>
  )
}
