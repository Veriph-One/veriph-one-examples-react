export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
  }

  const { sessionUuid } = req.query;
  const url = new URL(
    "https://service.veriph.one/sdk-api/phone-verification/verification-result/v1.0.0"
  );
  url.searchParams.set("sessionUuid", sessionUuid);

  // Replace this with your API Key & secret, remember to key these values accesible to your server only.
  // Never expose this value to client-side code. Also, use environment variables or secrets
  // that keep the value from being committed to a repository.

  const apiKey = null; // SET YOUR API KEY HERE
  const secret = null; // SET YOUR API KEY SECRET HERE
  
  if (apiKey === null || secret === null) {
    console.error("API Key/Secret is null, get yours at dashboard.veriph.one");
    res.status(500).json({
      error:
        "API Key/Secret has not been configured, get yours at dashboard.veriph.one",
    });
    return;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        Authorization: `Basic ${secret}`,
      },
    });
    const verificationResult = await response.json();

    // If the firstSuccessfulAttempt object is included, the verification was successful.
    if (verificationResult.firstSuccessfulAttempt) {
      // Under non-example conditions, this is where your server's magic would happen.
      // You can create an account, perform a sensitive operation, or let the user continue
      // with the expected flow. In this example, we just return the phone number so that
      // the UI can show it.
      const countryCode =
        verificationResult.firstSuccessfulAttempt.countryCodeInput;
      const verifiedNumber =
        verificationResult.firstSuccessfulAttempt.phoneNumberInput;
      const fullNumber = `+${countryCode}${verifiedNumber}`;

      // When working with webapps and websites, the recommend approach involves using
      // redirections and query parameters to communicate next steps to the UI.
      const endUrl = new URL("http://localhost:3000/success");
      endUrl.searchParams.set("phone", fullNumber);
      res.redirect(307, endUrl.toString());
    } else {
      // If something goes wrong, we return to the last page and shown an error
      console.error(verificationResult);
      res.redirect(307, "/?error=20");
    }
  } catch (error) {
    console.error(error);
    res.redirect(307, "/?error=20");
  }
}
