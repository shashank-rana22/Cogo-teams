export default function FilePreview({ url = '', containerClass = '' }) {
	const decodedUrl = decodeURI(url);
	const urlSplitByDot = decodedUrl?.split?.('.') || [];
	const extension = urlSplitByDot?.[urlSplitByDot.length - 1];

	const type = ['jpg', 'jpeg', 'png', 'gif'].includes(extension)
		? `image/${extension}` : 'application/pdf';

	const urlSplitBySlash = decodedUrl?.split?.('/') || [];
	const filename = urlSplitBySlash?.[urlSplitBySlash.length - 1];

	return (
		<div className={containerClass}>
			<b>{filename}</b>

			<object
				title="Booking Note"
				width="100%"
				height="100%"
				type={type}
				data={url}
			/>
		</div>
	);
}
