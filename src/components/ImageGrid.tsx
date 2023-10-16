import { ImageType } from "@/app/page";
import ImageComponent from "./ImageComponent";

type ImageGridProps = {
  images: ImageType[];
  loading: boolean;
  onDelete: () => void;
};

const ImageGrid = ({ images, loading, onDelete }: ImageGridProps) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-4">
      {loading && <span className="text-xl">Loading...</span>}
      {!loading &&
        images?.map(({ name, data }) => (
          <ImageComponent
            key={name}
            src={data}
            alt={name}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default ImageGrid;
