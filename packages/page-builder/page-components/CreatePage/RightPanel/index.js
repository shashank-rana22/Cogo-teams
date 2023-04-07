import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import ButtonComponent from '../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../commons/widgets/ImageComponent';
import TextComponent from '../../../commons/widgets/TextComponent';

const ITEM_TYPES = {
	text   : 'text',
	button : 'button',
	image  : 'image',
};

function Item(props) {
	const {
		widget, components, setComponents, index, id,
		moveItem,
		isNewItemAdding,
		onNewAddingItemProps,
		onClick,
		isSelected,

	 } = props;

	const { type, id: elementId } = widget;

	const itemRef = useRef(null);

	//! Portal :: useDrop hook for builderItem
	// TODO :: refactor and split here while adding portal
	const [{ handlerId }, drop] = useDrop({
		accept: Object.keys(ITEM_TYPES),
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!itemRef.current && !itemRef.current?.getBoundingClientRect) {
				return;
			}

			//! Position arrangement for item sorting and adding
			const { top, bottom, height } = itemRef.current.getBoundingClientRect();
			const { y } = monitor.getClientOffset();
			const hoverIndex = index;
			const dragIndex = item.index;

			const hoverMiddleY = (bottom - top) / 2;
			const hoverClientY = y - top;

			//! Portal :: compare id and tempID in here
			if (!id || dragIndex === hoverIndex) {
				return;
			}

			//! Portal :: reorder items
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			if (!isNewItemAdding) {
				onNewAddingItemProps({ hoveredIndex: hoverIndex });
				moveItem(dragIndex, hoverIndex);
				item.index = hoverIndex;
			} else {
				const belowThreshold = top + height / 2;
				const newShould = y >= belowThreshold;
				onNewAddingItemProps({
					hoveredIndex   : hoverIndex,
					shouldAddBelow : newShould,
				});
			}
		},
	});

	//! Portal :: isDragging prop. might be use for styling changes in dnd process or something like that purposes
	const [{ isDragging }, drag] = useDrag({
		type,
		item    : { type, id, index },
		collect : (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	//! Portal :: trigger the item as dnd object
	const ref = drag(drop(itemRef));

	const opacity = isNewItemAdding && !id ? '0.3' : '1';

	const border = isSelected ? '3px dashed blue' : '1px solid silver';

	return (
		<div
			ref={ref}
			data-handler-id={handlerId}
			onClick={onClick}
			style={{
				opacity,
				border,
				padding : '10px',
				margin  : '10px',
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

export default Item;
