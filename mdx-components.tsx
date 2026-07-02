import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { Tweet } from "react-tweet";
import Alert from "@/components/alert";
import Lottie from "@/components/lottie";

type ImgProps = Omit<ComponentPropsWithoutRef<"img">, "src"> & {
	src?: string | StaticImageData | object;
};

// rehype-mdx-import-media turns ![](./x.png) into static imports; lottie JSON
// imports arrive as plain animation data objects
const Img = ({ src, alt, ...rest }: ImgProps) => {
	if (src && typeof src === "object") {
		if (!("src" in src)) {
			return <Lottie animationData={src} label={alt} />;
		}
		return (
			<figure className="my-6">
				<Image src={src} alt={alt ?? ""} className="mx-auto" />
				{alt ? (
					<figcaption className="mt-2 text-center text-sm text-[color:var(--textMuted)]">
						{alt}
					</figcaption>
				) : null}
			</figure>
		);
	}
	// eslint-disable-next-line @next/next/no-img-element
	return <img src={src} alt={alt ?? ""} {...rest} />;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		img: Img,
		Alert,
		Tweet,
		...components
	};
}
