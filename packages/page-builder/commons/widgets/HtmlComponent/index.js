import React from 'react';

import DragPreview from '../../DragPreview';

function HtmlComponent({ widget }) {
	const { component } = widget || {};

	const { content, isDraggingPreview } = component || {};

	if (isDraggingPreview) {
		return (
			<DragPreview showBackDrop={false} type="html" />
		);
	}

	return (
		<div
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}

export default HtmlComponent;
