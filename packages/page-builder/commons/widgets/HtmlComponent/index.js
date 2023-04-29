import React from 'react';

function HtmlComponent({ widget }) {
	const { component } = widget || {};

	const { content } = component || {};

	return (
		<div
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}

export default HtmlComponent;
