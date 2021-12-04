import { Publication } from './api/types';

export const sortPublications = (
  pubs: Array<Publication>
): Array<Publication> => {
  return pubs?.sort((a, b) => {
    const dateA = new Date(a?.created_at);
    const dateB = new Date(b?.created_at);

    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    }
    return 0;
  });
};
