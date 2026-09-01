import NextImage, { type ImageProps } from "next/image";
import { assetPath } from "@/app/lib/assets";

function resolveSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src === "string" && src.startsWith("/")) {
    return assetPath(src);
  }

  return src;
}

export default function BaseImage(props: ImageProps) {
  return <NextImage {...props} src={resolveSrc(props.src)} />;
}

