import { useCallback, useEffect, useMemo, useState } from "react";
import { Web3Storage, Upload } from "web3.storage";
import { IPFSObject } from "../interface/ipfs.interface";
import { makeStorageClient } from "../utils/ipfs";

interface Options {
  list?: boolean;
  before?: string;
  limit?: number;
  cid?: string;
}

export function useIpfs({ before, limit = 10, list = true }: Options) {
  const client = useMemo(() => makeStorageClient(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<IPFSObject[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const uploadFiles: any = [];
      for await (const item of client.list({ maxResults: limit, before })) {
        uploadFiles.push(item);
      }
      setData(uploadFiles);

      setIsLoading(false);
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return [isLoading, error, data, fetchData] as const;
}
