import React from "react";

export default function Home() {
  const [number, setNumber] = React.useState(undefined);

  // Next.JS cannot access window outside client-side execution so we rely on
  // the useEffect hook to obtain the result.
  // This can be simplified when using a different framework.
  React.useEffect(() => {
    // Under non-example conditions, your server would return a value that users
    // & bad actors wouldn't be able to synthesize, for instance a JSON Web Token (JWT)
    // or some sort of credential that would be needed to continue
    const params = new URLSearchParams(window.location.search);
    const result = params.get("phone");
    if (!result) {
      window.location.href = "/?error=30";
    }
    setNumber(result);
  }, []);

  return (
    <main>
      <div>
        <h1>Account created successfully</h1>
        <p>
          Congratulations, you have successfully created an account using the
          phone number you verified:
        </p>
        <h3>{number}</h3>
        {/* You can replace this anchor <a> with a button or similar element */}
        {/* Also, the url can be opened using Javascript, more info: */}
        {/* https://developer.veriph.one/docs/web/launch */}
        <a href="/">Go back</a>
      </div>
    </main>
  );
}
