const ordinalRules = new Intl.PluralRules("en", { type: "ordinal" });
const suffixes: Record<string, string> = {
	one: "st",
	two: "nd",
	few: "rd",
	other: "th"
};

const asDate = (iso: string) =>
	new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);

// "March 7th, 2019" — matches the old Gatsby "MMMM Do, YYYY" format
export function formatDate(iso: string): string {
	const d = asDate(iso);
	const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
	const day = d.getUTCDate();
	return `${month} ${day}${suffixes[ordinalRules.select(day)]}, ${d.getUTCFullYear()}`;
}

// "March 7th, 2019 6:05 pm" for comment tooltips
export function formatDateTime(iso: string): string {
	const d = asDate(iso);
	const time = d
		.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "UTC" })
		.toLowerCase();
	return `${formatDate(iso)} ${time}`;
}

// "8 years ago" — replaces moment().fromNow()
export function timeAgo(iso: string): string {
	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
	const seconds = (asDate(iso).getTime() - Date.now()) / 1000;
	const units: [Intl.RelativeTimeFormatUnit, number][] = [
		["year", 31536000],
		["month", 2592000],
		["day", 86400],
		["hour", 3600],
		["minute", 60]
	];
	for (const [unit, size] of units) {
		if (Math.abs(seconds) >= size) {
			return rtf.format(Math.round(seconds / size), unit);
		}
	}
	return "just now";
}
