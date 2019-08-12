rm -r ./public
gatsby build
aws s3 rm s3://www.sanamdeep.com --recursive
aws s3 sync ./build s3://www.sanamdeep.com
aws cloudfront create-invalidation --distribution-id E1DQJG1URGSL9M --paths "/*"