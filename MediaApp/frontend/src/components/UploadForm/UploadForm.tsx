import "./UploadForm.css";
import { useMemo, useState } from "react";
import { Web3Storage } from "web3.storage";
import "reactjs-popup/dist/index.css";
import { getFiles, resizeFile } from "../../utils/ipfs";
import Popup from "reactjs-popup";

interface IProps {
  onBackgroundClick: () => void;
  onUploadFinish: (cid: string) => void;
  isOpen: boolean;
}
export const UploadForm = ({
  onBackgroundClick,
  onUploadFinish,
  isOpen,
}: IProps) => {
  const [dragActive, setDragActive] = useState(false);
  const client = useMemo(() => makeStorageClient(), []);
  const [progressing, setProgressing] = useState("0");
  const [uploading, setUploading] = useState(false);
  function makeStorageClient() {
    return new Web3Storage({ token: import.meta.env.VITE_WEB3STORAGE_TOKEN });
  }

  async function storeWithProgress(files: File[]) {
    let filename = files[0].name;
    if (filename.startsWith("compressed_")) {
      filename = filename.replace("compressed_", "");
    }

    const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
    let uploaded = 0;

    const onStoredChunk = (size: number) => {
      uploaded += size;
      let progress = 100 * (uploaded / totalSize);
      if (progress > 100) {
        progress = 100;
      }
      setProgressing(`${progress.toFixed(2)}%`);
    };

    const cid = await client.put(files, {
      onStoredChunk,
      name: filename,
    });
    isOpen = false;
    setUploading(false);
    onUploadFinish(cid);
  }

  const handleDrop = async function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setUploading(true);
    const files: any = getFiles();
    let listUpload = [];
    listUpload.push(files.item(0));
    if (files.item(0).type.startsWith("image")) {
      const fileCompressed = await resizeFile(files.item(0));
      console.log(
        "🚀 ~ file: UploadForm.tsx:73 ~ handleDrop ~ fileCompressed:",
        fileCompressed
      );

      const fileCompressedRename = new File(
        [fileCompressed],
        `compressed_${fileCompressed.name}`,
        { type: fileCompressed.type }
      );
      listUpload.push(fileCompressedRename);
    }

    await storeWithProgress(listUpload);
  };

  return (
    <Popup
      modal
      nested
      open={isOpen}
      className="p-0 m-0"
      onClose={onBackgroundClick}
    >
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${
            dragActive
              ? "bg-gray-50 bg-gray-600"
              : "bg-gray-100 dark:bg-gray-700"
          }  0 dark:hover:bg-bray-800 
         hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
        >
          {uploading ? (
            <>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-white mb-3">
                  Uploading {progressing}%
                </span>
              </div>
              <div className="w-10/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-discord-100 h-2.5 rounded-full"
                  style={{ width: "100% " }}
                ></div>
              </div>{" "}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          )}

          <input
            id="dropzone-file"
            onChange={handleDrop}
            type="file"
            className="hidden"
          />
        </label>
      </div>
    </Popup>
  );
};
