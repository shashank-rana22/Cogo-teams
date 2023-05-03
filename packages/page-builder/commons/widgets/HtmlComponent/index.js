import React from 'react';

import HtmlPreview from './HtmlPreview';

function HtmlComponent({ widget }) {
	const { component } = widget || {};

	const { content, isDraggingPreview } = component || {};

	if (isDraggingPreview) {
		return (
			<HtmlPreview />
		);
	}

	return (
		<div
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}

export default HtmlComponent;
