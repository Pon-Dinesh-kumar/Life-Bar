import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface GenerationOptions {
  width: number;
  height: number;
  quality?: number;
  scale?: number;
}

const defaultOptions: GenerationOptions = {
  width: 1200,
  height: 800,
  quality: 1.0,
  scale: 2
};

export const generateHighQualityImage = async (
  element: HTMLElement,
  options: GenerationOptions = defaultOptions
): Promise<Blob> => {
  const canvas = await html2canvas(element, {
    width: options.width,
    height: options.height,
    scale: options.scale || 2,
    useCORS: true,
    logging: false,
    foreignObjectRendering: true,
    onclone: (clonedDoc) => {
      const clonedElement = clonedDoc.getElementById(element.id);
      if (clonedElement) {
        // Reset styles to ensure proper rendering
        clonedElement.style.width = `${options.width}px`;
        clonedElement.style.height = `${options.height}px`;
        clonedElement.style.position = 'relative';
        clonedElement.style.overflow = 'visible';
        clonedElement.style.display = 'block';
        clonedElement.style.visibility = 'visible';
        clonedElement.style.opacity = '1';
        clonedElement.style.transform = 'none';
        clonedElement.style.margin = '0';
        clonedElement.style.padding = '0';
        clonedElement.style.boxSizing = 'border-box';
        clonedElement.style.background = 'none';
        clonedElement.style.border = 'none';
        clonedElement.style.boxShadow = 'none';
        clonedElement.style.zIndex = '1';

        // Ensure all child elements are visible
        const allElements = clonedElement.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i] as HTMLElement;
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.style.display = 'block';
          el.style.position = 'relative';
          el.style.zIndex = '1';
        }
      }
    }
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png', options.quality);
  });
};

export const generatePDF = async (
  element: HTMLElement,
  options: GenerationOptions = defaultOptions
): Promise<Blob> => {
  const imageBlob = await generateHighQualityImage(element, options);
  const imageUrl = URL.createObjectURL(imageBlob);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [options.width, options.height]
  });

  pdf.addImage(imageUrl, 'PNG', 0, 0, options.width, options.height);
  URL.revokeObjectURL(imageUrl);

  return pdf.output('blob');
};

export const generateStaticWebpage = async (
  element: HTMLElement,
  options: GenerationOptions = defaultOptions
): Promise<Blob> => {
  const imageBlob = await generateHighQualityImage(element, options);
  const imageUrl = URL.createObjectURL(imageBlob);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Life Bar</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f5f5f5;
          }
          img {
            max-width: 100%;
            height: auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
        </style>
      </head>
      <body>
        <img src="${imageUrl}" alt="Life Bar">
      </body>
    </html>
  `;

  URL.revokeObjectURL(imageUrl);
  return new Blob([html], { type: 'text/html' });
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}; 