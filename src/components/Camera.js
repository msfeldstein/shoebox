import React from 'react'
import Webcam from 'react-webcam'

export default function(props) {
    console.log("PROPS" ,props)
    const directoryName = 'name'
    const directoryID = 'id'
    return <div>
            <div>{directoryName} {directoryID} hi</div>
            <Webcam />
        </div>
}