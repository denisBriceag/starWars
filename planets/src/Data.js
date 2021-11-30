import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Data = (props) => {
    const { person } = props;

    const [planet, setPlanet] = useState('');
    const [starships, setStarship] = useState([]);
    const [vehicles, setVehicle] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        fetch(person.homeworld)
            .then((responce) => {
                return responce.json();
            })
            .then((data) => {
                setPlanet(data)
            })

        person.starships.forEach((ship) => {
            fetch(ship)
                .then((responce) => {
                    return responce.json();
                })
                .then((data) => {
                    setStarship([...starships, data.name]);
                })
        })
        person.vehicles.forEach((vehicle) => {
            fetch(vehicle)
                .then((responce) => {
                    return responce.json();
                })
                .then((data) => {
                    setVehicle([...vehicles, data.name]);
                })
        })

        setShow(true)
    };

    return (
        <>
            <div className='planet-block'>
                <div className='planet-title'>  {person.name}</div>
                <div className='planet-info'>
                    <b><p>Height: {person.height}</p></b>
                    <b><p>Gender: {person.gender}</p></b>
                    <button onClick={handleShow}>more info</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Additional info:</Modal.Title>
                </Modal.Header>
                <Modal.Body><b>Planet:</b> {planet.name}</Modal.Body>
                <Modal.Body><b>Starships:</b> {[...starships]}</Modal.Body>
                <Modal.Body><b>Vehicles:</b> {[...vehicles]}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Data;