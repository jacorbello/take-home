"use client";
type ButtonProps = {
  label: string;
  onUpload: () => void;
};

const UploadButton = ({ label, onUpload }: ButtonProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("/api", {
        method: "POST",
        body: formData,
      }).then(() => {
        onUpload();
      });
    }
  };

  return (
    <label className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded uppercase cursor-pointer">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default UploadButton;
