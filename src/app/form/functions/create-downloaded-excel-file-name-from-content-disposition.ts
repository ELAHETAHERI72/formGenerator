export const createDownloadedExcelFileNameFromContentDisposition = (contentDisposition: string | null): string => {
  let fileName: string = '';
  if (contentDisposition?.length) {
    fileName = contentDisposition
      .slice(contentDisposition.indexOf('="') ?
        contentDisposition.indexOf('="') + 2 : 0, contentDisposition.lastIndexOf('"'))
  } else {
    fileName += Date.now();
  }
  return fileName;
}
