const cloudinary=require("cloudinary").v2;

const CLOUDINARY_API_KEY="569718411388971"
const CLOUDINARY_API_SECRET="wCCAqv0CcB6nK1L6NnzbVgyRicc"
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})
import AlbumGrid from "./album-grid";
import { SearchResult } from "@/app/gallery/page";
import { ForceRefresh } from "@/components/force-refresh";

export default async function GalleryPage({
  params: { albumName },
}: {
  params: {
    albumName: string;
  };
}) {
  const results = (await cloudinary.search
    .expression(`resource_type:image AND folder=${albumName}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Album {albumName}</h1>
        </div>

        <AlbumGrid images={results.resources} />
      </div>
    </section>
  );
}
