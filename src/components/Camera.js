import React, { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import { useDispatch } from 'redux-react-hook'
import { uploadFile } from '../modules/upload'

export default function(props) {
    const directoryName = props.match.params.folder_name
    const directoryID = props.match.params.folder_id

    const webcam = useRef(null)

    const dispatch = useDispatch()
    const upload = useCallback(
        (photo) => {
            const screenshot = webcam.current.getScreenshot()
            dispatch(uploadFile(directoryID, screenshot))
        },
        [directoryID]
    )



    return <div>
            <div>{directoryName} {directoryID} hi</div>
            <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                ref={webcam} />
            <button onClick={() => upload("pp")}>Upload</button>
        </div>
}