import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
	// block crawlers on preview deploys
	if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
		return { rules: { userAgent: "*", disallow: "/" } };
	}

	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: `${SITE_URL}/sitemap.xml`
	};
}
