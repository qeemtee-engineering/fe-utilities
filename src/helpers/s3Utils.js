export const replaceS3withCDN = url => {
  url = url.replace(/^https?:\/\//, '');
  if (url.includes(`${process.env.REACT_APP_AWS_BUCKET_NAME}.`)) {
    url = url.split('/');
    url[0] = process.env.REACT_APP_CDN_NAME;
    url = url.join('/');
  }
  return url;
};
