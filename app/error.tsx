"use client";

// we shoould be aboe to capture the errors on this page

//define the props for the component
interface Props {
  error: Error;
  // *retry*
  // this is a function that we can call to reset the error state
  reset: () => void;
}

// in a real app, we should log this error using a logging service
// so instead of logging it on the console, that is only visible to our clients, we should log it somewhere permanent so we can go back and identify the issues in our app
// the one I personally like is Sentry (sentry.io)
const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error occurred:", error);
  return (
    <>
      <div>An unexpected error has occurred.</div>
      {/* we had to do this becasue in this component we are handling the click event of this button */}
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
    </>
  );
};

export default ErrorPage;

// now sometimes our errors are temporary so in certain parts of our app we may want to give the user a chance to retry to do that *retry*
