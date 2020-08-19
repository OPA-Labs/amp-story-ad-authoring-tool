import {CallToActionEnum} from './call-to-action';
import {LandingTypeEnum} from './landing-type-values';

export interface generateAmpHtmlParams {
  readonly callToAction: CallToActionEnum;
  readonly landingUrl: string;
  readonly landingType: LandingTypeEnum;
  readonly assetSrc?: string;
  readonly assetFilePath?: string;
  readonly assetFile: File;
}

export function generateAdAmpHtml(ampHtml: generateAmpHtmlParams) {
  const adHtml =
    '"<!doctype html><html amp4ads><head><meta charset=\\"utf-8\\"><meta name=\\"viewport\\" content=\\"width=device-width,minimum-scale=1\\"><meta name=\\"amp-cta-type\\" content=\\"' +
    ampHtml.callToAction +
    '\\"><meta name=\\"amp-cta-url\\" content=\\"' +
    ampHtml.landingUrl +
    '\\"><meta name=\\"amp-cta-landing-page-type\\" content=\\"' +
    ampHtml.landingType +
    '\\"><style amp4ads-boilerplate>body{visibility:hidden}<\\/style><script async src=\\"https:\\/\\/cdn.ampproject.org\\/amp4ads-v0.js\\"><\\/script>';

  const ampVideoRuntime =
    '<script async custom-element=\\"amp-video\\" src=\\"https:\\/\\/cdn.ampproject.org\\/v0\\/amp-video-0.1.js\\"><\\/script>';

  const imageHtml =
    '<\\/head><body><amp-img layout=\\"fill\\" src=\\"' +
    ampHtml.assetSrc +
    '\\"><\\/amp-img><\\/body><\\/html>"';

  const videoHtml = ampHtml.assetFile
    ? '<\\/head><body><amp-video layout=\\"fill\\" height=\\"1920\\" width=\\"1080\\" autoplay loop> <source src=\\"' +
      ampHtml.assetSrc +
      '\\" type=\\"' +
      ampHtml.assetFile.type +
      '\\" \\/><\\/amp-video><\\/body><\\/html>"'
    : '';

  const adAmpHtml = ampHtml.assetFile?.type.includes('video')
    ? adHtml + ampVideoRuntime + videoHtml
    : adHtml + imageHtml;

  return adAmpHtml;
}

export function generateHtmlForDownload(ampHtml: generateAmpHtmlParams) {
  const adHtml = `
    <!doctype html>
    <html amp4ads>
      <head>
        <meta charset=\"utf-8\">
        <meta name=\"ad.size\" content=\"width=1,height=1\">
        <meta name=\"viewport\" content=\"width=device-width,minimum-scale=1\">
        <meta name=\"amp-cta-type\" content=\"${ampHtml.callToAction}\">
        <meta name=\"amp-cta-url\" content=\"${ampHtml.landingUrl}\">
        <meta name=\"amp-cta-landing-page-type\" content=\"${ampHtml.landingType}\">
        <style amp4ads-boilerplate>
          body{visibility:hidden}
        <\/style>
        <script async src=\"https:\/\/cdn.ampproject.org\/amp4ads-v0.js\"><\/script>`;

  const ampVideoRuntime = `
        <script async custom-element=\"amp-video\" src=\"https:\/\/cdn.ampproject.org\/v0\/amp-video-0.1.js\"><\/script>`;

  const imageHtml = `
      <\/head>
        <body>
          <amp-img layout=\"fill\" src=\"${ampHtml.assetFilePath}\">
          <\/amp-img>
        <\/body>
    <\/html>`;

  const videoHtml = ampHtml.assetFile
    ? `
      <\/head>
        <body>
          <amp-video layout=\"fill\" height=\"1920\" width=\"1080\" autoplay loop>
            <source src=\"${ampHtml.assetFilePath}\" type=\"${ampHtml.assetFile.type}\" \/>
          <\/amp-video>
        <\/body>
    <\/html>`
    : ``;

  const adAmpHtml = ampHtml.assetFile?.type.includes('video')
    ? adHtml + ampVideoRuntime + videoHtml
    : adHtml + imageHtml;

  return adAmpHtml;
}
