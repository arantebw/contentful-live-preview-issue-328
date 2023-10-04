import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

function MyApp({ Component, pageProps }) {
  return (
    <ContentfulLivePreviewProvider locale="en-US">
      <Component {...pageProps} />
    </ContentfulLivePreviewProvider>
  );
}

export default MyApp;
