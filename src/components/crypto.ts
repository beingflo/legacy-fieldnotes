export type KeyMaterial = {
  wrapped_key: string;
  iv_content: string;
  iv_metadata: string;
};

export const arrayBuffer2string = (
  buffer: ArrayBuffer | Uint8Array
): string => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

export const string2arrayBuffer = (str: string): ArrayBuffer => {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
};

export const decrypt_note = async (
  key: string,
  iv: string,
  encrypted_content: string
): Promise<string | null> => {
  const dec = new TextDecoder();

  const iv_ab = string2arrayBuffer(iv);

  const key_cc = await window.crypto.subtle.importKey(
    'raw',
    string2arrayBuffer(key),
    'AES-GCM',
    false,
    ['decrypt']
  );

  const content = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv_ab,
    },
    key_cc,
    string2arrayBuffer(encrypted_content)
  );

  return dec.decode(content);
};

export const importKey = async (rawKey: string): Promise<CryptoKey> => {
  const key = await window.crypto.subtle.importKey(
    'raw',
    string2arrayBuffer(rawKey),
    'AES-GCM',
    false,
    ['decrypt']
  );

  return key;
};

export const decrypt_metadata = async (
  key: string,
  iv: string,
  encrypted_metadata: string
): Promise<string | null> => {
  const dec = new TextDecoder();

  const note_key = await importKey(key);

  const iv_metadata = string2arrayBuffer(iv);

  const metadata = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv_metadata,
    },
    note_key,
    string2arrayBuffer(encrypted_metadata)
  );

  return dec.decode(metadata);
};
