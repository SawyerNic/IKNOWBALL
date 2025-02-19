import { useState, useRef } from 'react'
import ReactDOM from 'react-dom'

const shortQuestion = () => {
    function handleSubmit(e) {
        e.preventDefault();
    
        const inputValue = e.target.elements.formInput.value;
    
      
        console.log(inputValue);
      }
      return (
        <div>
          <div>
          <img src='https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33192.png'/>
          </div>
          <form id='questionPostForm' onSubmit={handleSubmit}>
              <input name='formInput'></input>
            <button type='submit'>Enter</button>
          </form>
        </div>
      );
}

const init = () => {
  let questionDiv = document.getElementById('questionDiv');

  ReactDOM.render(<shortQuestion />, questionDiv);
}

window.onload = init;