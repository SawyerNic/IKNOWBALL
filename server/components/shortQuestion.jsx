import { useState, useRef } from 'react'

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
  const questionDiv = document.getElementById('questionDiv');

  questionDiv = shortQuestion;
}

window.onload = init;