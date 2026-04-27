// utils/resize-images.js
import sharp from "sharp";

const images = [
  {
    input: "originals/lifts.jpeg",
    name: "lifts",
    sizes: [600, 900, 1200, 1800],
  },
  {
    input: "originals/chofe.jpg",
    name: "chofe",
    sizes: [600, 900, 1200, 1800],
  },
  {
    input: "originals/level.jpg",
    name: "level",
    sizes: [600, 900, 1200, 1800],
  },
  {
    input: "originals/boxes.jpg",
    name: "boxes",
    sizes: [600, 900, 1200, 1800],
  },
];

for (const { input, name, sizes } of images) {
  for (const width of sizes) {
    await sharp(input)
      .resize({ width })
      .webp({ quality: 40 })
      .toFile(`src/assets/media/images/${name}-${width}w.webp`);
  }
}
