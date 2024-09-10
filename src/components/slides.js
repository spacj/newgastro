import React from 'react';
import '../App.css';

function Slides() {
  return (
    <div className='slides'>
      <div className='slide slideone'>
        <div className='three-obj'></div>
        <div className='content'>
          <div className='title titleone'><h3>Manage <br/>everything from<br/> your phone</h3></div>
          <div className='description'></div>
        </div>
      </div>
      <div className='slide slidetwo'>
        <div className='three-obj'></div>
        <div className='content'>
          <div className='title'><h3>QR Code Menu</h3></div>
          <div className='description'></div>
        </div>
      </div>
      <div className='slide slidethree'>
        <div className='three-obj'></div>
        <div className='content'>
          <div className='title titleone'><h3>Websites Design <br/> & Developement</h3></div>
          <div className='description'></div>
        </div>
      </div>
      </div>
  )
}
export default Slides;