import React from 'react';

function HtmlComponent({ html = '' }) {
	return (
		<div
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

export default HtmlComponent;
