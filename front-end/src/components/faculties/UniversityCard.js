import {useNavigate} from 'react-router';

function UniversityCard(props){
    const navigate=useNavigate()

   const{
    name
   }=props;

   const goToPage=async()=>{
    try {
        navigate(`/university/${name}`)
    } catch (error) {
        console.error(error)
    }
   }

    return(
        <div>
            <button className="buttons-list" onClick={()=>{goToPage()}}>
                {name}
            </button>
        </div>
    )
}
export default UniversityCard;