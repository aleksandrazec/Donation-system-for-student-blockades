import { useState, useEffect } from "react";
import api from '../../services/api';

function UniversityCard(props){
   const{name}=props;
    return(
        <div>
            <button>
                {name}
            </button>
        </div>
    )
}
export default UniversityCard;