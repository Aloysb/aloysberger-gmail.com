 import React from 'react';


const Results = (props) => {

  return(
    <div className = 'results'>
      <input 
        type = 'button' 
        value = "< Previous results"
        onClick = {props.previousPage}
      />
      <input 
        type = 'button' 
        value = "Next results >"
        onClick = {props.nextPage}
      />
    </div>
  )
}

export default Results;