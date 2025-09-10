import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export const splashScreenPlugin = () => ({
  name: 'splash-screen-hasher',
  apply: 'build' as const,
  transformIndexHtml(html: string) {
    const splashDir = path.resolve(__dirname, '../../public/splash');
    const distDir = path.resolve(__dirname, '../../dist/splash');
    const hashedMap: Record<string, string> = {};

    // Ensure the dist/splash_screens directory exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Hash and rename splash screen files
    fs.readdirSync(splashDir).forEach((file) => {
      const absPath = path.join(splashDir, file);
      const stat = fs.statSync(absPath);

      // Skip if it's a directory
      if (!stat.isFile()) return;

      const content = fs.readFileSync(absPath);
      const hash = crypto
        .createHash('md5')
        .update(content)
        .digest('hex')
        .slice(0, 8);

      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const hashedName = `${name}.${hash}${ext}`;
      const hashedPath = path.join(distDir, hashedName);

      // Copy the file to the dist folder with the hashed name
      fs.copyFileSync(absPath, hashedPath);
      hashedMap[file] = `/splash/${hashedName}`;

      // Remove the original splash screen file from dist if it exists
      const originalDistPath = path.join(distDir, file);
      if (fs.existsSync(originalDistPath)) {
        fs.unlinkSync(originalDistPath); // Remove the original
      }
    });

    // Replace references in index.html with hashed URLs
    let replacedHtml = html;
    Object.entries(hashedMap).forEach(([original, hashed]) => {
      replacedHtml = replacedHtml.replace(
        new RegExp(
          `/splash/${original.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}`,
          'g',
        ),
        hashed,
      );
    });

    return replacedHtml;
  },
});
