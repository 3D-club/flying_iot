import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap"

const DataCards = ({ data }) => {
  return (
    <div className="datacards">
      {data.map(card => (
        <Card key={card.id} >
          <Card.title>{ card.title }</Card.title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>Something Here</Card.Text>
          <Card.Link as={Link} to={`/cloudData/${card.id}`}>More Details</Card.Link>  
        </Card>
      ))}
    </div>
  );
}
 
export default DataCards;