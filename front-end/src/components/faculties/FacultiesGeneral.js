import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"

function facultiesGeneral(props){
    const user=useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=>{
        if(user.role==='Guest' || user.role==='Citizen'){
            try {
                navigate('/faculties')
            } catch (error) {
                console.error(error)
            }
        }
    }, user)
    return(
        <div>
            congrats ur a {user.role}
        </div>
    )
}
export default facultiesGeneral