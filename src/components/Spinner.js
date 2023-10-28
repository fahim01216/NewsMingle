import React, { Component } from 'react';
import loading from './loading.gif';

export default function Spinner() {
  return (
    <div className='d-flex justify-content-center'>
      <img src={loading} alt="loading" />
    </div>
  )
}
