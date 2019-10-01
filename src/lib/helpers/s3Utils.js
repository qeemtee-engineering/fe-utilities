export const replaceS3withCDN = url => {
  const s3URL = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com`;
  if (url.includes(s3URL)) {
    url = url.replace(s3URL, process.env.REACT_APP_CDN_NAME);
  }
  return url;
};
