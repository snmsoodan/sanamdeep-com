npm run build && npm run deploy
aws cloudfront create-invalidation --distribution-id E1DQJG1URGSL9M --paths "/*"