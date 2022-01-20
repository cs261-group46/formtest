import React, {FC, useState} from 'react';
import styles from './Form2.module.css';
import {Controller, useForm} from "react-hook-form";
import {Button, FormControl, ToggleButton, ToggleButtonGroup} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const business_areas: {[id: string]: string[]} = {
    '1': ["core"],
    '2': ["research"]
}

const people: {[expertises: string]: string[]} = {
    core: [
        "core a",
        "core b",
    ],
    finance: [
        "finance a",
        "finance b",
    ],
    research: [
        "research a",
        "research b",
    ],
}

const Form2: FC = () => {
    const defaultValues = {
        id: "",
        name: "",
        dept: "core",
        role: "mentor",
        mentor_in: [] as string[]
    }

    const {register, handleSubmit, formState, watch, setValue, control} = useForm({
        mode: "onChange",
        defaultValues: defaultValues
    });

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [fixedOptions, setFixedOptions] = useState<string[] | undefined>(undefined);

    const getFixedOptions = async () => {
        setFixedOptions(undefined)
        await sleep(1000)
        setFixedOptions(business_areas[watch("id")])
    }

    return (
        <div className={styles.Form2}>
            <form className={"Form"} onSubmit={handleSubmit((data => {
                console.log(data);
                console.log(formState.errors)
            }))}>
                <FormControl>
                    <TextField
                        label={"Your ID"}
                        inputProps={{
                            inputMode: "numeric",
                        }}
                        {...register("id", {
                            required: true,
                            pattern: /^[0-9]+$/,
                            onBlur: () => getFixedOptions()
                        })}
                    />
                    {fixedOptions && <p>required: {fixedOptions}</p>}
                    <TextField label={"Your Name"} {...register("name", {required: true})}/>
                    <Controller render={({field}) => (
                        <ToggleButtonGroup exclusive {...field}>
                            <ToggleButton value={"mentor"}>
                                Mentor
                            </ToggleButton>
                            <ToggleButton value={"mentee"}>
                                Mentee
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )} name={"role"} control={control}/>
                    <input type="hidden" {...register("dept")}/>
                    <Autocomplete
                        multiple
                        options={["management"]}
                        renderInput={(params) => <TextField label={`Would also ${watch("role")} in`} {...params}/>}
                        onChange={(_, value) => {
                            setValue("mentor_in", value)
                        }}
                        value={watch("mentor_in") as any}
                    />
                    <Button type="submit">Submit</Button>
                </FormControl>
            </form>
        </div>
    );

}

export default Form2;
