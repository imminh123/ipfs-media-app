import { Web3Storage, Upload } from "web3.storage";
import Resizer from "./Resizer";

export function makeStorageClient() {
  return new Web3Storage({ token: import.meta.env.VITE_WEB3STORAGE_TOKEN });
}

export function getFiles() {
  const fileInput: any = document.querySelector('input[type="file"]');
  if (fileInput) return fileInput.files;
  return null;
}

export const resizeFile = (file: File): Promise<File> =>
  new Promise((resolve) => {
    console.log("🚀 ~ file: ipfs.ts:30 ~ newPromise ~ Resizer:", Resizer);
    console.log(
      "🚀 ~ file: ipfs.ts:30 ~ newPromise ~ Resizer:",
      typeof Resizer
    );

    Resizer.imageFileResizer(
      file,
      500,
      500,
      "JPEG",
      80,
      0,
      (uri: any) => {
        resolve(uri);
      },
      "file",
      60,
      60
    );
  });

export function makeFileObjects() {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = { hello: "world" };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

  const files = [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "hello.json"),
  ];
  return files;
}

export async function storeFiles(files: File[]) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}

export async function storeWithProgress(client: Web3Storage, files: File[]) {
  // show the root cid as soon as it's ready
  const onRootCidReady = (cid: string) => {
    console.log("uploading files with cid:", cid);
  };

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    const pct = 100 * (uploaded / totalSize);
    console.log(`Uploading... ${pct.toFixed(2)}% complete`);
  };

  // makeStorageClient returns an authorized web3.storage client instance

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, {
    onRootCidReady,
    onStoredChunk,
    name: "test file",
  });
}
