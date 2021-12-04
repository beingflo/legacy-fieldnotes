import React from 'react';
import { access_share } from '../api/share_api';
import { decrypt_note } from './crypto';
import { ArrowLeftIcon, FrownIcon, SadIcon } from './icons';
import DOMPurify from 'dompurify';
import useLocation from 'wouter/use-location';
import { SpinnerPage } from './Spinner';

export const BACK_QUERY = '?back=';
export const NOTE_LINK = 'note/';

const getHash = () => {
  return window.location.hash.slice(1);
};

const getQuery = () => {
  const search = window.location.search;

  if (search?.startsWith(BACK_QUERY)) {
    return window.location.search.slice(6);
  }

  return '';
};

export type Props = {
  token?: string;
};

export const NoteView = ({ token = '' }: Props): React.ReactElement => {
  const [note, setNote] = React.useState('');
  const [, setLocation] = useLocation();
  const [waiting, setWaiting] = React.useState(true);
  const [error, setError] = React.useState(false);

  const hash = getHash();

  React.useEffect(() => {
    access_share(token)
      .then((response) => {
        const encryptedContent = response?.content;

        decrypt_note(hash, response.iv, encryptedContent)
          .then((content) => setNote(content ?? ''))
          .catch(() => setError(true))
          .finally(() => setWaiting(false));
      })
      .catch(() => {
        setError(true);
        setWaiting(false);
      });
  }, [hash, token]);

  const backRef = getQuery();

  const handleBack = () => {
    if (backRef) {
      setLocation(`/${backRef}`);
    }
  };

  if (waiting) {
    return <SpinnerPage />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center pt-20 md:pt-0 md:justify-center h-screen">
        <div className="flex flex-col items-center">
          <SadIcon className="w-24 h-24 text-gray-800" />
          <div className="text-lg text-gray-800">Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto w-full">
      <div className="mx-auto w-max max-w-full sm:max-w-md md:min-w-sm lg:max-w-2xl py-6 md:py-6 px-8 md:px-2 prose prose-sm md:prose">
        {backRef && (
          <button
            onClick={handleBack}
            className="pb-4 flex flex-row gap-1 items-center text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <div>{backRef}</div>
          </button>
        )}
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note) }} />
      </div>
    </div>
  );
};

export default NoteView;
