function Checkbox(props){
    const{
        item
    }=props
    return(
        <div>
            <input type="checkbox" id={item} value={item}/>
            <label htmlFor={item}>{item}</label>
            <br/>
        </div>
    )
}
export default Checkbox