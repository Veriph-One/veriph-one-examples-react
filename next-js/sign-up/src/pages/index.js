import React from "react";

export default function Start() {
  // Replace this with your server's start endpoint
  // More information: https://developer.veriph.one/docs/server/start-endpoint
  const VERIFICATION_START_URL = "/api/start-verification";
  const [errorCode, setErrorCode] = React.useState(undefined);

  // Next.JS cannot access window outside client-side execution so we rely on
  // the useEffect hook to obtain the query params for potential errors.
  // This can be simplified when using a different framework.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setErrorCode(params.get("error"));
  }, []);

  // A different error message is shown based on the query param returned by the
  // server. Error 10 is returned by this example's start-verification endpoint,
  // while Error 20 is used by end-verification, and Error 30 is shown when the
  // user tries to navigate without a proper verification.
  const getErrorMsg = () => {
    switch (errorCode) {
      case "10":
        return "An error ocurred when starting the verification flow.";
      case "20":
        return "The verification process was unsuccessful";
      case "30":
        return "You need to sign up first";
    }
  };

  return (
    <main>
      <div>
        <h1>Phone-based login example</h1>
        <p>
          This example uses React and Veriph.One to capture a phone number, it
          provides an example API, but you can replace it with your own.
        </p>
        <p>
          Remember to set your API Key and Secret by editing&nbsp;
          <code>src/pages/api/start-verification.js</code>&nbsp; and&nbsp;
          <code>src/pages/api/end-verification.js</code>&nbsp;
        </p>
        {/* You can replace this anchor <a> with a button or similar element */}
        {/* Also, the url can be opened using Javascript, more info: */}
        {/* https://developer.veriph.one/docs/web/launch */}
        <a href={VERIFICATION_START_URL}>Start the verification flow</a>
      </div>
      {/* Error message is only rendered when necessary */}
      {errorCode && (
        <div>
          <p
            style={{
              color: "#FF0000",
            }}
          >
            Error: {getErrorMsg()}
          </p>
        </div>
      )}
    </main>
  );
}
