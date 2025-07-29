import {useNavigate} from 'react-router';

function FacultyCard(props){
    const navigate=useNavigate()

   const{
    name,
    id
   }=props;

   const goToPage=async()=>{
    try {
        navigate(`/faculty/${id}`)
    } catch (error) {
        console.error(error)
    }
   }

    return(
        <div>
            <button onClick={()=>{goToPage()}}>
                {name}
            </button>
        </div>
    )
}
export default FacultyCard;