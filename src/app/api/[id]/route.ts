import { images } from "@/lib/storage";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const image = images.get(id);
  if (!image) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(image, {
    headers: { "content-type": "image/png" },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  images.delete(id);
  return new Response(`Deleted ${id}`, { status: 200 });
}
