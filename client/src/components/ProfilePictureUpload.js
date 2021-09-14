import {useDropzone} from "react-dropzone";
import moment from "moment";
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPLOAD_PROFILE_IMG } from '../utils/mutations';
import { render } from "react-dom";

export default function ProfilePictureUpload () {
   
    const { username } = useParams();

    // profile state = true will show the profile info, when false, shows the profile form
    // let [showProfileInfo, setProfileInfo] = useState(true);

    const [ updatePicture, {data}] = useMutation(UPLOAD_PROFILE_IMG);
    const [errors, setErrors] = useState();
    
    const [pictureState, setPictureState] = useState({
        name: "",
        file: null
    });

  const onDrop = useCallback(
    async ([filename]) => {
      if (filename) {
        // setPreview(URL.createObjectURL(file));
        updatePicture({ variables: { filename: formatFilename(filename.name) } });
        console.log("INSIDE onDROP");
        console.log(filename.name);
        console.log(formatFilename(filename.name));
      } else {
        setErrors(
          'Something went wrong. Check file type and size (max. 1 MB)',
        );
      }
    },
    [updatePicture],
  )

     
      const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
      } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxSize: 1024000,
      });


    const pictureHandleChange = (event) => {
        const { name, value } = event.target;

        setPictureState({
            ...pictureState,
            [name]: value,
        });
        console.log("INSIDE PICTURE HANDLE CHANGE:")
        console.log(pictureState)

    };

    const formatFilename = name => {
        const date = moment().format("YYYYMMDD");
        const randomString = Math.random()
          .toString(36)
          .substring(2, 7);
        const cleanFileName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newFilename = `${date}-${randomString}-${name}`;
        return newFilename.substring(0, 60);
      };

  

    // const submit = async (event) => {
    //     event.preventDefault();
    //     console.log("SUBMIT CLICKED")
    //     try {
    //         const { name, file } = pictureState;         
    //         const { submitPicture } = await updatePicture({
    //             variables: {
    //                 filename: formatFilename(file.name),
    //                 filetype: file.type
    //             }
    //         });


    //         // window.location.assign('/dashboard/'+ username);

    //     }catch (e) {
    //         console.error(e);
    
    //     }
    // }

    // return (
    //     <div>
    //     <input name="name" pictureHandleChange={pictureHandleChange} value={pictureState.name} />
    //     <Dropzone onDrop={onDrop}>
    //       <p>
    //         Try dropping some files here, or click to select files to upload.
    //       </p>
    //     </Dropzone>
    //     <button onClick={submit}>Submit</button>
    //   </div>
    // )

     return (

        <div {...getRootProps({ isDragActive, isDragAccept, isDragReject })} className="photo-div">
        <input {...getInputProps()} name="name" pictureHandleChange={pictureHandleChange} value={pictureState.name} />
            {isDragActive ? (
                <p className="upload-box">Drop the files here ...</p>
            ) : (
                <p className="upload-box">Drop file here, or click to select the file</p>
            )}
      </div>
    )
}

