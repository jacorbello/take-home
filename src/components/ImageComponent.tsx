import Image from "next/image";

type ImageComponentProps = {
  src: string;
  alt: string;
  onDelete: () => void;
};

const ImageComponent = ({ src, alt, onDelete }: ImageComponentProps) => {

  const handleClick = () => {
    fetch(`/api/${alt}`, {
      method: "DELETE",
    }).then(() => {
      onDelete();
    });
  };

  return (
    <div className="relative w-64 h-48 border border-white overflow-hidden group">
      <Image src={src} alt={alt} fill objectFit="cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-4 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm text-white">{alt}</span>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded uppercase cursor-pointer"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ImageComponent;
