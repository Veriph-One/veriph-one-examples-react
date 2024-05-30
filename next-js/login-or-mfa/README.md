# Veriph.One MFA React Example

A sample integration of the Veriph.One SDK to show how our service works. This project is a barebones implementation of Veriph.One's SDK with no style, additional dependencies or unnecessary frameworks. The project uses React (plain Javascript) and [Next.js](https://nextjs.org/). Our technology is framework-agnostic are neither are necessary for the integration to work.

## Getting Started

1. Ensure you have gone through the developer documentation to understand how to integrate phone-based verification to your web app. Developer docs can be found [here](https://developer.veriph.one/docs/intro).

### (Optional) Test the integration using this example

2. Clone this folder from the repo to test the integration in isolation.
3. Set your API Key and Secret in the `src/pages/api/start-verification.js` and `src/pages/api/end-verification.js` endpoints. Also, configure the phone number you want to use for MFA in `src/pages/api/start-verification.js`.
4. Use the [Veriph.One dashboard](https://dashboard.veriph.one) to configure your API Key's callback URL to `http://localhost:3000/api/end-verification`.
5. Run the server locally by using:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the example in action.
7. Tinker with the code and the API Key configuration to better understand how to integrate the SDK into your codebase.

### Use your own Start and Result Endpoints

8. Have your [Start](https://developer.veriph.one/docs/server/start-endpoint) and [Result](https://developer.veriph.one/docs/server/result-endpoint) Endpoints ready using your app's intended flow. And make sure to set your Result Endpoint as your API Key's callback, see the [Setup page](https://developer.veriph.one/docs/setup) for more information.
9. (Optional) Remove the `src/pages/api` folder and its contents to ensure you are not using the example API.
10. Replace the `VERIFICATION_START_URL` in `src/pages/index.js` with your Start Endpoint's URL.
11. Use the [Veriph.One dashboard](https://dashboard.veriph.one) to configure your API Key's callback URL to your Result Endpoint's URL.
12. Use this repo as a boilerplate to create your verification flow or integrate the sample code into your existing codebase.
13. Set up your verification result page(s) with the proper data points so they can have the expected behavior.
