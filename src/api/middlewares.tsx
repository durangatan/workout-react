import { EbcFetchConfig } from './api';

export const loggingMiddleware = ({ config, url }: EbcFetchConfig) => {
  console.log(`EBC-API-${config ? config.method : 'GET'}:${url}`, config ? config.body : null);
  return Promise.resolve({ config, url });
};
