export type PublicationResult = {
  token: string;
  created_at: string;
  modified_at: string;
  metadata: string;
  public: string;
  iv: string;
};

export type Publication = {
  title: string;
  tags: string;
  token: string;
  created_at: string;
  modified_at: string;
  public: string;
};
