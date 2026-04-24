// utils/resize-images.js
import sharp from "sharp";

const images = [
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
    sizes: [400, 600, 800],
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
