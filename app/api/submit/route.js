import * as htmlPdf from 'html-pdf-node';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body; // Extract JSON data from the request
    const htmlContent = generateHTML(data); // Generate HTML from the data

    try {
      // Define the file object with HTML content
      const file = { content: htmlContent };

      // Define options for the PDF
      const options = {
        format: 'A4',
        printBackground: true,
      };

      // Generate the PDF buffer
      const pdfBuffer = await htmlPdf.generatePdf(file, options);

      // Send the generated PDF as a response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="generated.pdf"'
      );
      return res.status(200).send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error.message);
      return res.status(500).json({ message: `Failed to generate PDF: ${error.message}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Function to generate simple HTML from data
function generateHTML(data) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PDF Content</title>
      <style>
        body { font-family: Arial, sans-serif; }
        .container { margin: 20px; padding: 20px; border: 1px solid #ccc; }
        h1 { color: #4CAF50; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; }
        .value { margin-left: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Form Data</h1>
        ${Object.entries(data)
          .map(
            ([key, value]) => `
            <div class="field">
              <span class="label">${key}:</span>
              <span class="value">${value || 'N/A'}</span>
            </div>`
          )
          .join('')}
      </div>
    </body>
    </html>
  `;
}
