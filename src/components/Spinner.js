import React from 'react'
import loading from './loading.gif'
const Spinner = () => {
    return (
      <div>
      <div className="my-3 text-center">

        <img src={loading} alt="loading..." />
      </div>
      </div>
    )
}

export default Spinner
