import { UploadIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileInput = () => {
  const [files, setFiles] = useState<File[]>([]);
  console.log("file", files);
  const onDrop = useCallback((newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
  });
  return (
    <div
      {...dropzone.getRootProps()}
      className="h-full w-1/2 rounded-lg border-4 border-dashed border-gray-600"
    >
      <label htmlFor="dropzone-file" className="h-full w-full cursor-pointer">
        <div className="flex-cow flex h-full w-full items-center justify-center pb-6 pt-5">
          <UploadIcon
            className={`mb-3 h-10 w-10 ${
              dropzone.isDragActive ? "primary-200" : "text-gray-400"
            }`}
          />
        </div>
      </label>
      <input {...dropzone.getInputProps()} className="hidden" />
    </div>
  );
};

export default FileInput;
