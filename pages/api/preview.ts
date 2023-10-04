import { NextApiRequest, NextApiResponse } from 'next';

import {
  isPreviewSecretEqual,
  setPreviewCookie
} from 'utils';

type QueryType = {
  secret: string;
  type: string;
  slug: string;
  id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const contentTypes = [
    'homePage',
    'aboutPage',
    'learnDetails',
    'storiesPage',
    'tag',
    'podcastEpisode'
  ];
  const { secret, type, slug, id } = req.query as QueryType;
  let location = '/';

  if (!contentTypes.includes(type)) {
    res.status(401).json({ message: 'use the right content type' });
  }

  const isSecretNotEqual = await isPreviewSecretEqual(secret);
  if (isSecretNotEqual) {
    res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({});
  setPreviewCookie(res);

  res.writeHead(307, { Location: location });
  res.end();
};

export default handler;
