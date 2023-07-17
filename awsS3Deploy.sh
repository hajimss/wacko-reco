npm run build
aws s3 sync ./build s3://wacko-reco.hazim.net
aws s3 sync ./build s3://www.wacko-reco.hazim.net
