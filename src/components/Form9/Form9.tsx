import React, {FC} from 'react';
import styles from './Form9.module.css';
import {Controller, useForm} from "react-hook-form";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Form9: FC = () => {
    const defaultValues = {
        room: "",
        day: Date.now(),
        hour: 0,
        public: false
    }

    const {handleSubmit, formState, control, register} = useForm({
        mode: "onChange",
        defaultValues: defaultValues
    });

    return (
        <div className={styles.Form9}>
            <form className={"Form"} onSubmit={handleSubmit((data => {
                console.log(data);
                console.log(formState.errors)
            }))}>
                <FormGroup>
                    <FormControl>
                        <InputLabel>Room</InputLabel>
                        <Controller render={({field}) => (
                            <Select{...field}>
                                <MenuItem value={1}>Room 1</MenuItem>
                            </Select>
                        )} name={"room"} control={control}/>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Controller render={({field}) => (
                            <DatePicker
                                label={"Date"}
                                renderInput={(params) => <TextField {...params}/>}
                                {...field}
                            />
                        )} name={"day"} control={control}/>
                    </LocalizationProvider>
                    <FormControl>
                        <InputLabel>Hour</InputLabel>
                        <Controller render={({field}) => (
                            <Select {...field}>
                                <MenuItem value={0}>12:00</MenuItem>
                                <MenuItem value={1}>12:30</MenuItem>
                                <MenuItem value={2}>13:00</MenuItem>
                            </Select>
                        )} name={"hour"} control={control}/>
                    </FormControl>
                    <FormControlLabel control={<Checkbox {...register("public")}/>} label={"Public?"}/>
                    <Button type="submit">Submit</Button>
                </FormGroup>
            </form>
        </div>
    );

}

export default Form9;
