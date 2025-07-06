interface IMentorHeader {
	readonly title: string;
	readonly description?: string;
	readonly className?: string;
}

export default function MentorHeader({
	title,
	description,
	className,
}: IMentorHeader) {
	return (
		<div className={className}>
			<h1 className="text-2xl font-semibold">{title}</h1>
			{description && (
				<p className="text-muted-foreground mt-1">{description}</p>
			)}
		</div>
	);
}
