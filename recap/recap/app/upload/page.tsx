"use client";
// 8.) Import the CldImage component to show the uploaded image
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

// 6.) create an interface because the info object has a lot of properties but we can't see them becuase it wasn't typed
interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  // Declare a State Variable for storing public id, once we have that we can pass the public id to an image component to show the uploaded image
  // 3.) use the state hook here to initialize it to an empty string
  const [publicId, setPublicId] = useState("");

  return (
    // 9.) Add a fragment to wrap both the CldUploadWidget and the CldImage component
    <>
      {/* 10. If publicId exists, render the CldImage component */}
      {publicId && (
        <CldImage
          src={publicId}
          width={400}
          height={300}
          alt="Uploaded Image"
        />
      )}
      <CldUploadWidget
        uploadPreset="uploadingFiles"
        // 1.) give the widget a success event handler (onSuccess replaces deprecated onUpload)
        onSuccess={(result) => {
          // 2.) log the result on the console to see the uploaded image details
          // console.log("Upload Result:", result);
          // 4.) Check if the event was a success event cause if not we don't want to do anything
          if (result.event !== "success") return;
          // 5.) If it was a success event, update the public id state variable with the uploaded image public id
          //   7.) Typecast the result.info to our CloudinaryResult interface to access the public_id property
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
