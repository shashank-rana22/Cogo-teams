import React, { useEffect, useRef } from 'react';

function PreviewHtml({ html = '' }) {
	const frameRef = useRef();

	useEffect(() => {
		const frameDoc = frameRef.current.contentDocument
			|| frameRef.current.contentWindow.document;
		frameDoc.body.innerHTML = html;
	}, [html]);

	return (
		<iframe
			width="100%"
			height="300px"
			frameBorder="0"
			title="Preview"
			ref={frameRef}
		/>
	);
}

export default PreviewHtml;
