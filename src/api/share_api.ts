import config from '../config.json';
import { mapError } from './index';
import { PublicationResult } from './types';

const SHARE_URL = `${config.api_url}/shares`;
const PUBLICATION_URL = `${config.api_url}/publications`;

export const access_share = (
  id: string
): Promise<{ content: string; iv: string }> => {
  return fetch(`${SHARE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .then((response) => response.json());
};

export const list_publication = (
  username: string
): Promise<Array<PublicationResult>> => {
  return fetch(`${PUBLICATION_URL}/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(mapError)
    .then((response) => response.json());
};
