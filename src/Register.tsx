import { FC } from 'react';
import Table from './contents/Table';
import Dropdown from "./contents/Dropdown"
import 'bootstrap/dist/css/bootstrap.min.css';



export const Register: FC = () => {
    return (
        <div>
            <h1>Register</h1>
            <Dropdown />
        </div>
    );
};
