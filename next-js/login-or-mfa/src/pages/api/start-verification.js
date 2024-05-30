export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
  }

  // Capture user-agent header for the metadata object
  const userAgent = req.headers["user-agent"];
  if (!userAgent) {
    res.status(400).json({ error: "Bad Request" });
  }
  // Capture client IP address for the metadata object
  const clientIp = req.headers["x-forwarded-for"];

  try {
    // This userId should be linked to some user-related object in your DB.
    // It allows you to identify usage of the same number across multiple accounts.
    // This example uses a random value for simplicity sake.
    const userId = crypto.randomUUID();

    const sessionMetadata = {
      userId: userId,
      ipAddress: clientIp,
      userAgent: userAgent,
    };

    // This object determines the number to be validated when launching an MFA flow.
    // Under normal conditions this should come from your database instead of being hardcoded.
    // Replace these values to your own to see how a successful process looks like.
    const prefilledPhoneNumber = {
      countryCode: "1", // Place the country code of the number you want to verify here
      cellphoneNumber: "0000000000", // Place the number you want to verify here
    }

    // Replace this with your API KEY, remember to key this value accesible to your server only.
    // Never expose this value to client-side code. Also, use environment variables or secrets
    // that keep the value from being committed to a repository.
    
    const apiKey = null; // SET YOUR API KEY HERE

    if (apiKey === null) {
      console.error("API Key is null, get yours at dashboard.veriph.one");
      res
        .status(500)
        .json({
          error:
            "API Key has not been configured, get yours at dashboard.veriph.one",
        });
      return;
    }

    // Create a verification session by making a request to the Veriph.One API
    const response = await fetch(
      "https://service.veriph.one/sdk-api/phone-verification/create-session/v1.0.0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          metadata: sessionMetadata,
          prefilledPhoneNumber,
          configuration: {
            locale: "en",
          },
        }),
      }
    );

    const sessionCreationResponse = await response.json();

    if (response.ok) {
      // Verification session was created successfully. In a real scenario, you'd
      // save the sessionUuid to your database to be able to identify which verification
      // result is linked to which transaction and user.
      // After doing so, we redirect the user to Veriph.One's SDK to perform the
      // verification flow.
      res.redirect(307, sessionCreationResponse.redirectionUrl);
    } else {
      console.error(response);
      // If something goes wrong, we return to the last page and shown an error
      res.redirect(307, "/?error=10");
    }
  } catch (error) {
    console.error(error);
    res.redirect(307, "/?error=10");
  }
}
