// 1.) import cloudinary widget
// 9.) Because there's an onClick event that means we have to make this a client component because it uses interactivity
"use client";
import { CldUploadWidget } from "next-cloudinary";

const UploadPage = () => {
  // 2.) Add the upload widget to our page
  // go to the upload tab in settings and click on `add upload preset`
  return (
    <CldUploadWidget uploadPreset="uploadingFiles">
      {/* 4.) Typically we would run a button here */}
      {/* This doesn't work because this component expects a function as its children */}
      {/* <button></button> */}
      {/* 5.) Pass a function as children */}
      {/* 6.) Give it a className of btn btn-primary and call the `upload` */}
      {/* 7.) Destructure the object that next cloudinary provides to the open function */}
      {({ open }) => (
        //   8.) Handle the onClick event on this button and call the open function
        <button className="btn btn-primary" onClick={() => open()}>
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPage;
