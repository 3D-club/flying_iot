import React,{ Component } from 'react'
import { Card } from "react-bootstrap"
import useAxiosGet from "./useAxiosGet"
import DataCards from "./DataCards"

const DataList = () => {
    const { data, error, isPending} = useAxiosGet("Enter the URL here");

    
    return(
        <div className='dataList container'>
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        {data && <DataCards data = {data}/>}
        {/* Sample card
        <Card>
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Card.Link href="#">More Details</Card.Link>
        </Card.Body>
        </Card>
        */}
        </div>
     )
    
}
export default DataList;