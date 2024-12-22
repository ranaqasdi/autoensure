import { chromium } from "playwright";

export async function POST(req) {
  try {
    const formData = await req.json();
    const htmlContent = `<html><body><h1>Generated PDF</h1><p>${formData.content}</p></body></html>`;

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="generated.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response(
      JSON.stringify({ message: `An error occurred: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
