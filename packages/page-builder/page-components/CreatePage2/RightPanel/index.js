import { isEmpty } from '@cogoport/utils';
import React from 'react';

import ButtonComponent from '../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../commons/widgets/ImageComponent';
import TextComponent from '../../../commons/widgets/TextComponent';

function ComponentBuilder({ component, components, setComponents }) {
	const { id: elementId, isRendered = false } = component;
	if (isRendered && isEmpty(component)) {
		return null; // skip rendering if already rendered
	}

	const { type } = component;

	const { content = '', styles, attributes = {} } = component.properties;

	const COMPONENT_MAPPING = {
		text: (
			<TextComponent
				text={content}
				elementId={elementId}
				components={components}
				setComponents={setComponents}
			/>
		),
		image: (
			<ImageComponent
				src={content}
				elementId={elementId}
				component={component}
				components={components}
				setComponents={setComponents}
			/>
		),
		button: (
			<ButtonComponent
				label={content}
				elementId={elementId}
				components={components}
				setComponents={setComponents}
			/>
		),
	};

	if (['text', 'image', 'button'].includes(type)) {
		return <div style={{ background: 'lavender', width: '100%', height: '100%' }}>{COMPONENT_MAPPING[type]}</div>;
	}

	let childComponents = [];

	if (type === 'container') {
		childComponents = components.filter((item) => item.parentId === elementId);

		return (
			<div style={styles}>
				{childComponents.length === 0
					? (
						<div
							role="presentation"
							onClick={attributes.onClick}
						>
							{content}
						</div>
					)
					: childComponents.map((childComponent) => (
						<ComponentBuilder
							key={childComponent.id}
							component={childComponent}
							components={components}
							setComponents={setComponents}
						/>
					))}
			</div>
		);
	}

	return null;
}

function RightPanel(props) {
	const { components, setComponents } = props;

	const rootComponents = components.filter((item) => !item.parentId);

	const renderedComponents = rootComponents.map((component) => (
		<ComponentBuilder
			key={component.id}
			component={component}
			components={components}
			setComponents={setComponents}
		/>
	));

	return <div className="drag-handle">{renderedComponents}</div>;
}

export default RightPanel;
