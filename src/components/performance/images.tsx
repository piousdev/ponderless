import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps
	extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
	priority?: boolean;
	loading?: "eager" | "lazy";
	placeholder?: "blur" | "empty";
	blurDataURL?: string;
	className?: string;
	containerClassName?: string;
	enablePrefetch?: boolean;
}

// Generate a blur data URL for placeholder
function generateBlurDataURL(width: number, height: number): string {
	return `data:image/svg+xml;base64,${Buffer.from(
		`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>`,
	).toString("base64")}`;
}

export function OptimizedImage({
	src,
	alt,
	width,
	height,
	priority = false,
	loading = "lazy",
	placeholder = "blur",
	blurDataURL,
	className,
	containerClassName,
	enablePrefetch = false,
	sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
	...props
}: OptimizedImageProps) {
	const imageWidth = typeof width === "number" ? width : 800;
	const imageHeight = typeof height === "number" ? height : 600;

	// Generate blur placeholder if not provided
	const finalBlurDataURL =
		blurDataURL || generateBlurDataURL(imageWidth, imageHeight);

	return (
		<div className={cn("relative overflow-hidden", containerClassName)}>
			{/* Prefetch link for critical images */}
			{enablePrefetch && priority && (
				<link
					rel="preload"
					as="image"
					href={typeof src === "string" ? src : (src as { src: string }).src}
					imageSizes={sizes}
				/>
			)}

			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				loading={priority ? "eager" : loading}
				placeholder={placeholder}
				blurDataURL={placeholder === "blur" ? finalBlurDataURL : undefined}
				sizes={sizes}
				className={cn(
					"object-cover transition-opacity duration-300",
					className,
				)}
				style={{
					aspectRatio: `${imageWidth} / ${imageHeight}`,
				}}
				{...props}
			/>
		</div>
	);
}

// Hero image variant with optimal settings for above-the-fold content
export function HeroImage({
	className,
	containerClassName,
	...props
}: OptimizedImageProps) {
	return (
		<OptimizedImage
			priority
			loading="eager"
			enablePrefetch
			sizes="100vw"
			className={cn("w-full", className)}
			containerClassName={cn("w-full", containerClassName)}
			{...props}
		/>
	);
}

// Lazy image variant for below-the-fold content
export function LazyImage({ className, ...props }: OptimizedImageProps) {
	return (
		<OptimizedImage
			priority={false}
			loading="lazy"
			className={cn("w-full", className)}
			{...props}
		/>
	);
}

// Avatar image variant with specific optimizations
export function AvatarImage({
	className,
	sizes = "(max-width: 768px) 96px, 128px",
	...props
}: OptimizedImageProps) {
	return (
		<OptimizedImage
			sizes={sizes}
			className={cn("rounded-full", className)}
			{...props}
		/>
	);
}
