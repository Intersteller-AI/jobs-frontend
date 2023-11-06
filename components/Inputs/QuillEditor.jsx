"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Quill because it requires a window object which is not present during server-side rendering.
const QuillNoSSRWrapper = dynamic(
  () => import('react-quill'),
  { ssr: false }
);

import 'react-quill/dist/quill.snow.css'

const QuillEditor = ({ value, setValue }) => {

  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <QuillNoSSRWrapper className='myQuillEditor' value={value} onChange={handleChange} />
  );
};

export default QuillEditor;
