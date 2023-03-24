import React from 'react';

function ComponentBuilder({ components }) {
	const handleButtonClick = () => {
		console.log('Button clicked!');
	};

	const buildComponent = (component) => {
		const { type, properties, children } = component;

		const COMPONENT_MAPPING = {
			container: (
				<div style={{ ...properties.styles }}>
					{(children || []).map((child) => buildComponent(child))}
				</div>
			),

			text  : <div style={{ ...properties.styles }}>{properties.content}</div>,
			image : (
				<img
					style={{ ...properties.style }}
					src={properties.content}
					alt="si"
				/>

			),
			button: (
				<a href={properties.redirectUrl} target="_blank" rel="noreferrer">
					<button
						{...properties.attributes}
						onClick={() => handleButtonClick()}
						style={{ ...properties.styles }}
					>
						{properties.content}
					</button>
				</a>
			),
		};

		return COMPONENT_MAPPING[type];
	};

	return (
		<div style={{ padding: '20px' }}>
			{(components || []).map((component) => buildComponent(component))}
		</div>
	);
}

export default ComponentBuilder;
