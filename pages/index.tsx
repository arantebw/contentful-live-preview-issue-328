import { GetStaticProps } from "next";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { HomePageType } from "../types";
import { getHomePage } from "../services";

type HomePageProps = {
  homepage: HomePageType;
  preview: boolean;
};

function HomePage({ homepage, preview }: HomePageProps) {
  const { welcomeMessage, whyGfedYouTubeId } = useContentfulLiveUpdates(homepage);

  return (
    <>
      <h1>Home Page</h1>
      <h2>{welcomeMessage}</h2>
      <LiteYouTubeEmbed
        id={whyGfedYouTubeId}
        title="In house architech"
        playerClass="lty-playbtn"
      />
    </>
  );
}

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const homepage = await getHomePage(preview);

  return {
    props: {
      preview: preview || false,
      homepage,
    },
    revalidate: 10,
  };
};
