import { favicons, FaviconOptions } from 'favicons';
import fs from 'fs/promises';
import { join } from 'path';

const src: string = 'src/public/img/favicon.png'; // Icon source file path.
const dir: string = 'src/public/img/favicons'; // Output directory path.
const htmlFile = 'src/components/favicons.html'; // HTML file basename.

const configuration: FaviconOptions = {
  path: 'img/favicons', // Path for overriding default icons path. `string`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
    appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
    appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
    windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
    yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
  },
};

try {
  const response = await favicons(src, configuration);
  await fs.mkdir(dir, { recursive: true });
  await Promise.all(response.images.map((image) => fs.writeFile(join(dir, image.name), image.contents)));
  await Promise.all(response.files.map((file) => fs.writeFile(join(dir, file.name), file.contents)));
  await fs.writeFile(htmlFile, response.html.join('\n'));
} catch (error) {
  console.log((error as Error).message); // Error description e.g. "An unknown error has occurred"
}
