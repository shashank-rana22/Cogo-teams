import React from 'react';

import ButtonComponent from '../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../commons/widgets/ImageComponent';
import TextComponent from '../../../commons/widgets/TextComponent';

function RightPanel(props) {
	const { widget, components, setComponents } = props;

	const { type, id: elementId } = widget;

	return (

		<div>
			{type === 'text' && (
				<TextComponent
					key={elementId}
					text={widget.content}
					components={components}
					setComponents={setComponents}
					elementId={elementId}
				/>
			)}

			{type === 'image' && (
				<ImageComponent
					key={elementId}
					src={widget.content}
					alt={widget.alt}
					components={components}
					setComponents={setComponents}
					elementId={elementId}
				/>
			)}
			{type === 'button' && (
				<ButtonComponent
					key={elementId}
					label={widget.content}
					themeType={widget.themeType}
					size={widget.size}
					type={widget.type}
					components={components}
					setComponents={setComponents}
					elementId={elementId}
				/>
			)}
		</div>
	);
}

export default RightPanel;
