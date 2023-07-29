import React, { useState, useEffect } from 'react';
import { connect } from "@planetscale/database";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from 'reactstrap';
import Loading from './Loading';

type BreedType = {
    id: string,
    name: string,
    price: string
}

function MasterTable() {
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [id, setId] = useState(-1);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [breed, setBreed] = useState<BreedType>();

    const config = {
        host: process.env["REACT_APP_DATABASE_HOST"],
        username: process.env["REACT_APP_DATABASE_USERNAME"],
        password: process.env["REACT_APP_DATABASE_PASSWORD"]
    }

    const [breeds, setBreeds] = useState<BreedType[]>([]);
    const con = connect(config);
    useEffect(() => {
        const getData = async () => {
            let rec = await con.execute(
                "select * from breed"
            );
            setBreeds(JSON.parse(JSON.stringify(rec.rows)));
        }

        getData();
    })

    const addToggle = () => setModal(!modal);

    const updateToggle = (e: any): void => {
        //クリックされたレコード情報を取得
        let id = e.target.parentNode.childNodes[0].textContent;
        let name = e.target.parentNode.childNodes[1].textContent;
        let price = e.target.parentNode.childNodes[2].textContent;

        let bt: BreedType = { id: id, name: name, price: price };
        console.log(bt);

        setBreed(bt);
        setUpdateModal(!updateModal);
    }

    const closeUpdateModal = () => {
        setUpdateModal(false);
    }

    const changeName = (e: any): void => {
        setName(e.target.value);
    }
    const changePrice = (e: any): void => {
        setPrice(e.target.value);
    }
    //DB登録
    const addBreed = async () => {
        await con.execute(
            `insert into breed
            values(null,'${name}','${price}')`
        )
        //モーダル閉じる
        setModal(false);
    }

    //DB更新  
    const updateBreed = async () => {
        await con.execute(
            `update breed
            set name = '${name}',price = '${price}'
            where id = '${breed?.id}'`
        )
        closeUpdateModal();
    }

    //DB削除
    const deleteBreed = async () => {
        await con.execute(
            `delete from breed
            where id = '${breed?.id}'`
        )
        closeUpdateModal();

    }

    return (
        <>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>名前</th>
                            <th>価格</th>
                        </tr>
                    </thead>
                    <tbody>
                        {breeds.map((d) => {
                            return (
                                <tr onClick={updateToggle}>
                                    <td id="id">{d.id}</td>
                                    <td id="name">{d.name}</td>
                                    <td id="price">{d.price}</td>
                                {/*    <td><Button onClick={updateToggle(d)}>修正</Button></td>*/}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            <div>
                <Button onClick={addToggle}>追加</Button>
                <Modal isOpen={modal} toggle={addToggle}>
                    <ModalBody>
                        <div>
                            <Label>名前</Label>
                            <Input type="text" onChange={changeName} />
                            <Label>価格</Label>
                            <Input type="number" onChange={changePrice}></Input>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={addBreed}>登録</Button>
                        <Button onClick={addToggle}>閉じる</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={updateModal} toggle={updateToggle}>
                    <ModalBody>
                        <div>
                            <Label>名前</Label>
                            <Input type="text" defaultValue={breed?.name} onChange={changeName} />
                            <Label>価格</Label>
                            <Input type="number" defaultValue={breed?.price} onChange={changePrice}></Input>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={updateBreed}>登録</Button>
                        <Button onClick={deleteBreed}>削除</Button>
                        <Button onClick={closeUpdateModal}>閉じる</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>

  );
}

export default MasterTable;