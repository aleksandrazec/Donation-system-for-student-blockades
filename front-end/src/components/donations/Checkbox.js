function Checkbox(props){
    const{
        item
    }=props
    return(
        <div>
            <input type="checkbox" id={item} name="Types" value={item}/>
            <label htmlFor={item}>{item}</label>
            <br/>
        </div>
    )
}
export default Checkbox