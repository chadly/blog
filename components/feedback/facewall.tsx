import type { WebmentionAuthor } from "@/lib/webmentions";

const FaceWall = ({ faces }: { faces: WebmentionAuthor[] }) => {
	if (!faces.length) return null;

	return (
		<ul className="group m-0 list-none p-0">
			{faces.map((f, i) => (
				<li
					key={i}
					title={f.name}
					className="-mr-6 inline-block transition-[margin-right] duration-500 group-hover:mr-2"
				>
					<a href={f.url ?? undefined}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={f.photo ?? ""}
							alt={f.name}
							className="h-12 w-12 rounded-full border border-black object-cover"
						/>
					</a>
				</li>
			))}
		</ul>
	);
};

export default FaceWall;
