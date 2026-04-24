// utils/resize-images.js
import sharp from "sharp";

const images = [
  /*
  {
    input: "src/assets/media/images/lift-employee.webp",
    name: "lift-employee",
    sizes: [200, 400, 900, 1200],
  },
  {
    input: "src/assets/media/images/company-2.webp",
    name: "company-2",
    sizes: [400, 800, 1200],
  },
  {
    input: "src/assets/media/images/img-8.webp",
    name: "img-8",
    sizes: [200, 400, 900, 1200],
  },
  */
  {
    input: "src/assets/media/images/img-15.webp",
    name: "img-15",
    sizes: [600, 900, 1400],
  },
  {
    input: "src/assets/media/images/chofe.webp",
    name: "chofe",
    sizes: [600, 900, 1400],
  },
  {
    input: "src/assets/media/images/level.webp",
    name: "level",
    sizes: [600, 900, 1400],
  },
  {
    input: "src/assets/media/images/boxes.webp",
    name: "boxes",
    sizes: [600, 900, 1400],
  },
];

for (const { input, name, sizes } of images) {
  for (const size of sizes) {
    await sharp(input)
      .resize(size)
      .webp({ quality: 80 })
      .toFile(`src/assets/media/images/${name}-${size}.webp`);
  }
}
