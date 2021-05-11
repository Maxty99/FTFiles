// Maxim Tyuterev
// FTFiles EE Topic for IB
// Module for loading SVG file data as paths

import fs from 'fs';
import { number } from 'mathjs';
import puppeteer from 'puppeteer';

class SVG {
  private fileContents: string;
  private page: puppeteer.Page | null;
  // Get file contents from file if it exists
  constructor() {
    this.fileContents = '';
    this.page = null;
  }

  loadFromString(contents: string) {
    if (contents != '') {
      this.fileContents = contents;
    } else {
      throw new Error('String invalid');
    }
  }

  loadFromFile(filePath: string) {
    if (fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8') != '') {
      this.fileContents = fs.readFileSync(filePath, 'utf-8');
    } else {
      throw new Error('File invalid');
    }
  }
  async initBrowser(): Promise<void> {
    if (this.fileContents != '') {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(this.fileContents);
      this.page = page;
    } else {
      throw new Error('File invalid, cannot start browser');
    }
  }

  async getPointAtLength(length: number): Promise<{ x: number; y: number }> {
    if (this.page == null) {
      await this.initBrowser();
    }

    const serializedPath = await this.page!.evaluate(
      (lengthParam) => {
        let path = document.querySelector('path');
        if (path != null) {
          return { x: path.getPointAtLength(lengthParam).x, y: path.getPointAtLength(lengthParam).y };
        } else return undefined;
      },
      length // Something wrong here
    ); //Dirty hack

    if (serializedPath != undefined) {
      return Promise.resolve(serializedPath);
    }

    return Promise.reject(new Error('Path invalid'));
  }

  async getTotalLength(): Promise<number> {
    if (this.page == null) {
      await this.initBrowser();
    }
    const pathLength = await this.page!.evaluate(() => {
      const path = document.querySelector('path');
      if (path != null) {
        return path.getTotalLength();
      } else return undefined;
    }); //Dirty hack
    if (pathLength != undefined) {
      return pathLength;
    } else {
      return Promise.reject(new Error('Path invalid'));
    }
  }

  async close(): Promise<void> {
    if (this.page) {
      await this.page.browser().close();
    }
    this.page = null;
  }
}

export default { SVG };
export { SVG };
