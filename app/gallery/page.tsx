import { v2 as cloudinary } from "cloudinary";
import GalleryGrid from "./GalleryGrid";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getGalleryImages() {
  const result = await cloudinary.api.resources_by_asset_folder("gallery", {
    max_results: 100,
    resource_type: "image",
  });
  return result.resources ?? [];
}

function AccentRule() {
  return <div className="w-10 h-px bg-accent mx-auto" />;
}

export default async function Gallery() {
  const images = await getGalleryImages();

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">
            gallery
          </h1>
          <AccentRule />
          <p className="text-sm text-ink-light font-light mt-5">
            moments from our engagement shoot
          </p>
        </div>

        <GalleryGrid images={images} />
      </div>
    </div>
  );
}
