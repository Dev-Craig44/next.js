"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
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
        // 1.) Here we can set the options for the upload widget
        options={{
          //  2.) Set soures to an array of source which we'll use local
          sources: ["local"],
          //   3.) Set multiple to false to only allow a single file upload
          multiple: false,
          //   4.) Set the max amount of files to 5
          maxFiles: 5,
          //   5.) override the styles for the upload widget and we would refere to the code on the demo site for more options
          styles: {},
          //
        }}
        onSuccess={(result) => {
          if (result.event !== "success") return;
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
