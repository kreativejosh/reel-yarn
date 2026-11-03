import { renderSocialImage, socialAlt, socialSize } from "@/components/SocialImage";

export const alt = socialAlt;
export const size = socialSize;
export const contentType = "image/png";

export default function Image() {
  return renderSocialImage();
}
