import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";

import { JournalApp } from './JournalApp';
import './styles/styles.scss'

// ReactDOM.render(
//   <JournalApp />,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <JournalApp />
  </React.StrictMode>
);
