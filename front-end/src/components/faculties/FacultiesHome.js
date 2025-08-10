import { useState, useEffect } from "react";
import api from '../../services/api';
import UniversityCard from './UniversityCard';

function FacultiesHome(props) {
    const [unis, setUnis] = useState();

    const getData = async () => {
        try {
            api.get(`/faculties/listuni`)
                .then((result) => {
                    console.log(result.data);
                    setUnis(result.data)
                })
                .catch(err => console.error('api error: ', err));

        } catch (error) {
            console.error('error: ', error)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <h1>Select university: </h1>
            <div className="button-div">
                {
                    unis ?
                        unis.map(uni => <UniversityCard name={uni.name} key={uni.key} />)
                        :
                        <p></p>
                }
            </div>
        </div >
    )
}

export default FacultiesHome;