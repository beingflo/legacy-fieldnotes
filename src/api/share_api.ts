import { mapError } from './index';
import { PublicationResult } from './types';

const API_URL = import.meta.env.VITE_API_URL;
const SHARE_URL = `${API_URL}/shares`;
const PUBLICATION_URL = `${API_URL}/publications`;

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
