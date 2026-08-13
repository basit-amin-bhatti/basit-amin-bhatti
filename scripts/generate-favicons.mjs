import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourcePath = process.argv[2];
const outputDirectory = process.argv[3];
const cropOverride = process.argv.slice(4, 7).map(Number);

if (!sourcePath || !outputDirectory) {
  throw new Error(
    "Usage: node scripts/generate-favicons.mjs <portrait.png> <public-directory> [left top size]",
  );
}

const source = sharp(sourcePath, { failOn: "error" });
const metadata = await source.metadata();

if (!metadata.width || !metadata.height) {
  throw new Error("The portrait dimensions could not be read.");
}

// Portrait-specific face crop: retains the complete hair silhouette, ears,
// beard, and black background while removing the suit and outer empty space.
const hasCropOverride =
  cropOverride.length === 3 && cropOverride.every(Number.isFinite);
const cropSize = hasCropOverride
  ? Math.round(cropOverride[2])
  : Math.round(Math.min(metadata.width, metadata.height) * 0.766);
const crop = hasCropOverride
  ? {
      height: cropSize,
      left: Math.round(cropOverride[0]),
      top: Math.round(cropOverride[1]),
      width: cropSize,
    }
  : {
      height: cropSize,
      left: Math.round((metadata.width - cropSize) / 2),
      top: Math.round(metadata.height * 0.008),
      width: cropSize,
    };

if (
  crop.left < 0 ||
  crop.top < 0 ||
  crop.left + crop.width > metadata.width ||
  crop.top + crop.height > metadata.height
) {
  throw new Error("The requested square crop is outside the source image.");
}

await mkdir(outputDirectory, { recursive: true });

async function renderPng(size) {
  let pipeline = sharp(sourcePath, { failOn: "error" })
    .extract(crop)
    .resize(size, size, {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .flatten({ background: "#000000" });

  if (size <= 48) {
    pipeline = pipeline.sharpen({ sigma: 0.65 });
  }

  return pipeline
    .png({ adaptiveFiltering: true, compressionLevel: 9, effort: 10 })
    .toBuffer();
}

function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(images.length * 16);
  let offset = header.length + directory.length;

  images.forEach(({ buffer, size }, index) => {
    const entryOffset = index * 16;
    directory.writeUInt8(size === 256 ? 0 : size, entryOffset);
    directory.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);
    directory.writeUInt8(0, entryOffset + 2);
    directory.writeUInt8(0, entryOffset + 3);
    directory.writeUInt16LE(1, entryOffset + 4);
    directory.writeUInt16LE(32, entryOffset + 6);
    directory.writeUInt32LE(buffer.length, entryOffset + 8);
    directory.writeUInt32LE(offset, entryOffset + 12);
    offset += buffer.length;
  });

  return Buffer.concat([header, directory, ...images.map(({ buffer }) => buffer)]);
}

const outputs = [
  [16, "favicon-16x16.png"],
  [32, "favicon-32x32.png"],
  [48, "favicon-48x48.png"],
  [96, "favicon-96x96.png"],
  [150, "mstile-150x150.png"],
  [180, "apple-touch-icon.png"],
  [192, "icon-192.png"],
  [512, "icon-512.png"],
  [1024, "favicon-logo.png"],
];

const rendered = new Map();
for (const [size, filename] of outputs) {
  const buffer = await renderPng(size);
  rendered.set(size, buffer);
  await writeFile(path.join(outputDirectory, filename), buffer);
}

const icoImages = [16, 32, 48].map((size) => ({
  buffer: rendered.get(size),
  size,
}));

await writeFile(
  path.join(outputDirectory, "favicon.ico"),
  createIco(icoImages),
);

console.log(
  `Generated ${outputs.length + 1} favicon assets from ${path.basename(sourcePath)}.`,
);
