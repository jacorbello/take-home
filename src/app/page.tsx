"use client";
import UploadButton from "@/components/UploadButton";
import SearchField from "@/components/SearchField";
import ImageGrid from "@/components/ImageGrid";
import { useState } from "react";

export type ImageType = {
  name: string;
  data: string;
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageType[]>([]);
  const refresh = () => {
    setLoading(true);
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setFilteredImages(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filterImages = (search: string) => {
    if (!search) {
      setFilteredImages(images);
      return;
    }
    const filtered = images.filter((image) =>
      image.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredImages(filtered);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-4 container">
      <div className="flex flex-row items-center justify-between w-full">
        <SearchField onChange={filterImages} />
        <UploadButton label="upload" onUpload={refresh} />
      </div>
      <span className="text-xl">
        {images?.length ?? 0} image{images?.length == 1 ? "" : "s"}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ImageGrid images={filteredImages} loading={loading} onDelete={refresh} />
      </div>
    </main>
  );
}
