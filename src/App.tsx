import React, {useEffect, useState} from 'react';
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {Controller, useForm} from "react-hook-form";


import logo from './logo.svg';
import './App.css'
import {Button, FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {log} from "util";
import Form2 from "./components/Form2/Form2";
import Form9 from "./components/Form9/Form9";

function App() {
    return (
        <div className="App">
            <Form2/>
            <Form9/>
        </div>
    );
}

export default App;
