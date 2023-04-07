/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import ButtonComponent from '../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../commons/widgets/ImageComponent';
import TextComponent from '../../../commons/widgets/TextComponent';

const ItemTypes = {
	CARD: 'card',
};

function RightPanel(props) {
	const { widget, components, setComponents, index, moveListItem, id } = props;

	const { type, id: elementId } = widget;

	const ref = useRef(null);
	const [{ handlerId }, drop] = useDrop({
	  accept: ItemTypes.CARD,
	  collect(monitor) {
			return {
		         handlerId: monitor.getHandlerId(),
			};
	  },
	  hover(item, monitor) {
			if (!ref.current) {
		  		return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
		  			return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		  			return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		  			return;
			}
			// Time to actually perform the action
			moveListItem(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
	  },
	});

	const [{ isDragging }, drag] = useDrag({
	  type    : ItemTypes.CARD,
	  item    : () => ({ id, index }),
	  collect : (monitor) => ({
			isDragging: monitor.isDragging(),
	  }),
	});

	// const opacity = isDragging ? 0 : 1;

	const dragDropRef = drag(drop(ref));

	return (

		<div ref={dragDropRef} data-handler-id={handlerId}>
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
