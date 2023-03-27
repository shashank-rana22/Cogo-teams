import React from 'react';

import ButtonComponent from '../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../commons/widgets/ImageComponent';
import TextComponent from '../../../commons/widgets/TextComponent';

function RightPanel(props) {
	const { widget, components, setComponents } = props;

	const { type, id: elementId } = widget;

	return (

		<div
			key={elementId}
			data-grid={{
				i           : widget?.i,
				x           : widget?.x,
				y           : widget?.y,
				w           : widget?.w,
				h           : widget?.h,
				minW        : 2,
				maxW        : Infinity,
				minH        : 2,
				maxH        : Infinity,
				isDraggable : true,
				isResizable : true,
			}}
		>
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
					style={widget.styles}
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
