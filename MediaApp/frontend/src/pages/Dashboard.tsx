import { useState } from "react";
import { Header } from "../components/Header";
import { MediaScroll } from "../components/MediaScroll/MediaScroll";
import { UploadForm } from "../components/UploadForm/UploadForm";
import { VideoJS } from "../components/Video";

export const Dashboard = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [cid, setCid] = useState<string>();
  const onFinishUpload = (cid: string) => {
    setCid(cid);
    setShowUpload(false);
  };

  return (
    <div className="bg-black relative overflow-x-auto">
      <Header onClick={() => setShowUpload(true)} />
      <section className="flex px-12 mt-4">
        <div className="w-1/2">
          <h1 className="text-5xl lg:text-6xl leading-tight  font-bold">
            Ciao, welcome to the knowledge playground
          </h1>
          <p className="mt-6 text-sm">
            Curios minds gather here to have a good time, be among us, join us!{" "}
          </p>
        </div>
        <div className="w-2/5">
          <VideoJS className="w-auto" />
        </div>
      </section>
      <div className="media-container">
        <UploadForm
          isOpen={showUpload}
          onBackgroundClick={() => setShowUpload(false)}
          onUploadFinish={onFinishUpload}
        />

        <MediaScroll
          className="recent-media"
          title="Recent knowledge"
          ratio="1:1"
          refresh={cid}
        />
        <MediaScroll
          className="trending-media"
          before="2023-02-23 18:30:00.000"
          title="Trending"
          ratio="16:9"
        />
        <MediaScroll
          className="explore-media"
          before="2023-02-23 18:00:00.000"
          title="Explore"
          ratio="4:3"
        />
      </div>
    </div>
  );
};
