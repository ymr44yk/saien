import React, { useState, useEffect } from 'react';
import { connect } from "@planetscale/database";
import { CSSProperties } from "react";
import { Table as TableStyle, Input, Label } from 'reactstrap';


type ShukakuType = {
    id: string,
    name: string,
    quantity:string
}

function Table() {
    const border: number = 1;
    const borderCollaps: CSSProperties = {
        borderCollapse: "collapse",
    };
    const thStyle: CSSProperties = {
        minWidth: "150px",
    };
    const config = {
        host: process.env["REACT_APP_DATABASE_HOST"],
        username: process.env["REACT_APP_DATABASE_USERNAME"],
        password: process.env["REACT_APP_DATABASE_PASSWORD"]
    }

    const [data, setData] = useState<ShukakuType[]>([]);
    const con = connect(config);
    useEffect(() => {
        const getData = async () => {
            let rec = await con.execute(
                "select h.id,b.name,h.quantity from harvest h " +
                "inner join breed b " +
                "on h.breedId = b.id");
            console.log(JSON.stringify(rec.rows));
            setData(JSON.parse(JSON.stringify(rec.rows)));
        };
        getData();
    },[]);

    return (
        <TableStyle>
            <thead>
                <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {data.map((r) => {
                    return (
                        <tr>
                            <td>{r.id}</td>
                            <td>{r.name}</td>
                            <td>{r.quantity}</td>
                        </tr>
                    );
                })}
            </tbody>
        </TableStyle>
  );
}

export default Table;