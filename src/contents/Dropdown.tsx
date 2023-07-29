import React, { useEffect, useState } from 'react';
import { connect } from "@planetscale/database";
import Select from 'react-select';
import { Button, Input, Label } from 'reactstrap';

type BreedType = {
    value: string,
    label: string
}

function Dropdown() {
    const [breed, setBreed] = useState<BreedType[]>([]);
    const [select, setSelect] = useState("");
    const [ID, setID] = useState(0);
    const [quantity, setQuantity] = useState("");

    const config = {
        host: process.env["REACT_APP_DATABASE_HOST"],
        username: process.env["REACT_APP_DATABASE_USERNAME"],
        password: process.env["REACT_APP_DATABASE_PASSWORD"]
    }
    const con = connect(config);

    useEffect(() => {
        const getData = async () => {
            let rec = await con.execute("select id as value,name as label from breed");
            console.log(JSON.stringify(rec.rows));
            setBreed(JSON.parse(JSON.stringify(rec.rows)));
        };
        getData();
    },[]);

    const onChange = (e: any): void => {
        setSelect(e.value);
    }

    const onChangeCount = (e: any): void => {
        setQuantity(e.target.value);
    }

    const onClick = async (e: any) => {
        console.log(ID + ":" + select + ":" + quantity);
        let d = new Date().toLocaleString().replaceAll("/", "-");

        await con.execute(
            `insert into harvest
            values(null,'${select}',${quantity},'${d}')`
        );
    }

    return (
        <div>
            <div>
                <Label>品種</Label>
                <Select options={breed} onChange={onChange} />
            </div>
            <div>
                <Label>数量</Label>
                <Input onChange={onChangeCount}/>
            </div>
            <div>
                <Button onClick={onClick}>登録</Button>
            </div>
        </div>
  );
}

export default Dropdown;