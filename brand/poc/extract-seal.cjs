const sharp = require('sharp');

async function main() {
  const cx = 671, cy = 383, radius = 362;
  const size = radius * 2;
  const left = cx - radius;
  const top = cy - radius;
  const cropH = Math.min(size, 768 - top);

  // 1. Extract the seal as a square crop
  await sharp('brand/tmp/k4.png')
    .extract({ left, top, width: size, height: cropH })
    .resize(724, 724, { fit: 'cover' })
    .toFile('brand/tmp/seal-raw.png');
  console.log('Extracted seal-raw.png (724x724)');

  // 2. Create circular mask
  const maskSize = 724;
  const r = maskSize / 2;
  const svgMask = `<svg width="${maskSize}" height="${maskSize}"><circle cx="${r}" cy="${r}" r="${r - 2}" fill="white"/></svg>`;
  const circleMask = await sharp(Buffer.from(svgMask))
    .resize(maskSize, maskSize)
    .greyscale()
    .raw()
    .toBuffer();

  // Get seal with alpha
  const { data: sealData } = await sharp('brand/tmp/seal-raw.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Apply circular mask to alpha channel
  for (let i = 0; i < maskSize * maskSize; i++) {
    sealData[i * 4 + 3] = circleMask[i];
  }

  const circularBuf = Buffer.from(sealData);
  const rawOpts = { raw: { width: maskSize, height: maskSize, channels: 4 } };

  // 3. Save various sizes
  await sharp(circularBuf, rawOpts).png().toFile('brand/tmp/seal-circle.png');
  console.log('Created seal-circle.png (724x724, circular)');

  await sharp(circularBuf, rawOpts).resize(512, 512).png().toFile('brand/social/avatar-512.png');
  console.log('Created avatar-512.png (512x512)');

  await sharp(circularBuf, rawOpts).resize(32, 32).png().toFile('public/favicon-32.png');
  console.log('Created favicon-32.png');

  await sharp(circularBuf, rawOpts).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  console.log('Created apple-touch-icon.png (180x180)');

  await sharp(circularBuf, rawOpts).resize(192, 192).png().toFile('public/icon-192.png');
  console.log('Created icon-192.png (192x192)');

  // 4. Paper texture background — extract from left margin of k4
  await sharp('brand/tmp/k4.png')
    .extract({ left: 0, top: 0, width: 280, height: 768 })
    .resize(400, 400, { fit: 'cover' })
    .png()
    .toFile('public/paper-bg.png');
  console.log('Created paper-bg.png (400x400 tileable)');

  // 5. Also create a non-circular version on paper background for banners
  // Square seal on paper bg (for use in banner compositions)
  await sharp('brand/tmp/k4.png')
    .extract({ left, top, width: size, height: cropH })
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile('brand/tmp/seal-square-512.png');
  console.log('Created seal-square-512.png (with natural bg)');

  console.log('\nAll assets extracted successfully!');
}

main().catch(e => { console.error(e); process.exit(1); });
