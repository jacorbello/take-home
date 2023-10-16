import { images } from "@/lib/storage";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(request: Request) {
  // Return all images in the images map
  const serializedImages = Array.from(images.entries()).map(([name, data]) => ({
    name,
    data,
  }));
  return new Response(JSON.stringify(serializedImages), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const f = formData.get("file");

  // If no file is found in the form data, return an error
  if (!f) {
    return new Response("No file found", { status: 400 });
  }

  // Cast the file to a File object
  const file = f as File;

  const fileArrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(fileArrayBuffer);
  const base64String = Buffer.from(uint8Array).toString("base64");

  // Store the image in the images map
  images.set(file.name, `data:image/png;base64,${base64String}`);
  return new Response(`${file.name} uploaded successfully`, { status: 200 });
}
