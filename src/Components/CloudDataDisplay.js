import axios from "axios";
import { useHistory, useParams } from "react-router-dom"
import useAxiosGet from "./useAxiosGet"


const CloudDataDisplay = () => {
  const { id } = useParams();
  const { data, error, isPending} = useAxiosGet("Enter the URL here" + id);
  const history = useHistory();
  const handleClick = () => {
    axios.delete("Enter the URL here" + data.id)
        .then(() => {
            history.push("/");
        })
  }
  return (
    <div className="container CloudDataDetails">
    { error && <div>{ error }</div> }
    { isPending && <div>Loading...</div> }
    {data && ( <div> 
      <h2>Data Details - {id}</h2>
      <p>Info</p>
      <button className="btn btn-danger" onClick={handleClick}>Delete</button></div>)}
    </div>
  );
}
 
export default CloudDataDisplay;