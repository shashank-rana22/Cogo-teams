import React, { useEffect, useRef } from 'react';

function HTMLPreview({ html = '', type = '' }) {
	const frameRef = useRef();

	useEffect(() => {
		const frameDoc = frameRef.current.contentDocument
			|| frameRef.current.contentWindow.document;
		frameDoc.body.innerHTML = html;
	}, [html]);

	return (
		<iframe
			width="100%"
			height={type === 'email' ? '400px' : '150px'}
			frameBorder="0"
			title="Preview"
			ref={frameRef}
		/>
	);
}

export default HTMLPreview;
