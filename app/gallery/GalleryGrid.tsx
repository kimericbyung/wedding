"use client";

import { CldImage } from "next-cloudinary";

type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
  format: string;
};

const BANNER_ID = "20260205_B_E_1509_i7rzgb";

function spreadGifs(
  photos: CloudinaryResource[],
  gifs: CloudinaryResource[]
): CloudinaryResource[] {
  if (gifs.length === 0) return photos;
  const total = photos.length + gifs.length;
  // target positions spread evenly across the combined array
  const gifPositions = gifs.map((_, i) =>
    Math.round(((i + 1) * total) / (gifs.length + 1))
  );

  const result: CloudinaryResource[] = [];
  let photoIdx = 0;
  let gifIdx = 0;

  for (let pos = 0; pos < total; pos++) {
    if (gifIdx < gifs.length && gifPositions[gifIdx] === pos) {
      result.push(gifs[gifIdx++]);
    } else {
      result.push(photos[photoIdx++]);
    }
  }

  return result;
}

export default function GalleryGrid({
  images,
}: {
  images: CloudinaryResource[];
}) {
  const banner = images.find((img) => img.public_id.includes(BANNER_ID));
  const rest = images.filter((img) => !img.public_id.includes(BANNER_ID));
  const gifs = rest.filter((img) => img.format === "gif");
  const photos = rest.filter((img) => img.format !== "gif");
  const gridItems = spreadGifs(photos, gifs);

  if (images.length === 0) {
    return (
      <p className="text-center text-sm text-ink-light font-light">
        no photos yet — check back soon.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {banner && (
        <div className="w-full overflow-hidden">
          <CldImage
            src={banner.public_id}
            width={banner.width}
            height={banner.height}
            alt="Brittaney & Eric"
            className="w-full h-64 md:h-96 object-cover object-center block"
          />
        </div>
      )}

      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {gridItems.map((img) => (
          <div key={img.public_id} className="break-inside-avoid">
            <CldImage
              src={img.public_id}
              width={img.width}
              height={img.height}
              alt=""
              className="w-full h-auto block"
              unoptimized={img.format === "gif"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
