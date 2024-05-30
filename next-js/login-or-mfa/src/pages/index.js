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
        return "The verification process was unsuccessful. Make sure you are using the correct phone.";
      case "30":
        return "You need to verify your number first";
    }
  };

  return (
    <main>
      <div>
        <h1>Phone-based MFA example</h1>
        <p>
          This example uses React and Veriph.One to verify a known phone number,
          it provides an example API, but you can replace it with your own.
        </p>
        <p>
          Remember to set your API Key and Secret by editing&nbsp;
          <code>src/pages/api/start-verification.js</code>&nbsp; and&nbsp;
          <code>src/pages/api/end-verification.js</code>&nbsp;
        </p>
        <p>
          The flow shown here allows you to validate that the current user has
          an specific phone in their posession at the time of a sensitive
          operation. For example, post-login (using phone as another
          authentication factor) or before executing a sensitive transation
          (e.g. a wire transfer or deleting an account). As such, under
          non-example conditions you would take the current user's phone number
          from your database and perform a verification against it; in this
          project, however, <b>the value is hardcoded</b> in{" "}
          <code>/src/pages/api/start-verification</code>, feel to change it to
          your own to see a successful result.
        </p>
        {/* You can replace this anchor <a> with a button or similar element */}
        {/* Also, the url can be opened using Javascript, more info: */}
        {/* https://developer.veriph.one/docs/web/launch */}
        <a href={VERIFICATION_START_URL}>
          Start the login/MFA verification flow
        </a>
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
