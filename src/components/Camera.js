import React, { useCallback, useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
import { useDispatch } from 'redux-react-hook'
import { uploadFile } from '../modules/upload'
import querystring from 'querystring'
import { receiveAuthToken } from '../modules/driveAuth'
import { getAuthToken } from '../apis/active'

const titleStyle = {
  color: 'white',
  textAlign: 'center',
  padding: '4px',
  position: 'fixed',
  top: '0',
  width: '100%',
  background: 'rgba(255,255,255,0.4)'
}

const buttonStyle = {
  position: 'fixed',
  bottom: '36px',
  left: '50%',
  width: '64px',
  height: '64px',
  marginLeft: '-32px'
}

export default function(props) {
    const directoryName = props.match.params.folder_name
    const directoryID = props.match.params.folder_id

    const webcam = useRef(null)

    const dispatch = useDispatch()
    useEffect(() => {
      const params = querystring.parse(document.location.hash.substring(1))
      if (params.access_token) {
        dispatch(receiveAuthToken(params.access_token))
      } else {
        document.location.hash = "access_token=" + getAuthToken()
      }
    })

    const upload = useCallback(
        (photo) => {
            const screenshot = webcam.current.getScreenshot()
            dispatch(uploadFile(directoryID, screenshot))
        },
        [directoryID]
    )

    const videoConstraints = {
      facingMode: 'environment'
    }

    return <div>
            <div style={titleStyle}>
              {directoryName}
            </div>
            <div>
            <Webcam
                audio={false}
                videoConstraints={videoConstraints}
                width={window.innerWidth}
                style={{
                  objectFit: 'cover'
                }}
                height={window.innerHeight}
                screenshotFormat="image/jpeg"
                ref={webcam} />
                </div>
            <button
              style={buttonStyle}
              onClick={() => upload("pp")}>Upload</button>
        </div>
}