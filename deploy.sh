cd packages/landing-page
npm run build

cd ../core-app
npm run build

cd ../..
rm -rf final-build
mkdir final-build
mkdir final-build/app

cp -R packages/landing-page/build/** final-build/
cp -R packages/core-app/build/** final-build/app/

npx gh-pages -d final-build