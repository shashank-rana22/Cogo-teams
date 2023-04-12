/* eslint-disable max-len */
import { isEmpty } from '@cogoport/utils';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import RenderComponents from './RenderComponent';

const ITEM_TYPES = {
	text        : 'text',
	button      : 'button',
	image       : 'image',
	container   : 'container',
	rootElement : 'rootElement',
};

function ComponentBuilder({ widget, components, setComponents }) {
	const { type: componetType, children, properties } = widget || {};

	const { styles: style } = properties || {};

	if (componetType === 'rootElement') {
		return (
			<div style={style}>

				<h1>Welcome to cogoport</h1>
			</div>
		);
	}

	if (isEmpty(children)) {
		return <div style={{ height: '150px' }}> Blocks loading...</div>;
	}

	return (
		<div style={style}>

			{ (children || []).map((childComponent) => {
				const { id } = childComponent || {};
				const { content = '', styles, attributes = {} } = childComponent.properties || {};
				const { icon, type } = content || {};

				return (
					<div style={styles}>

						{!type ? (
							<div
								role="presentation"
								onClick={attributes.onClick}
							>
								{icon}
							</div>
						) : <RenderComponents componentType={type} widget={childComponent} components={components} setComponents={setComponents} elementId={id} /> }

					</div>
				);
			})}
		</div>
	);
}

function Item(props) {
	const {
		widget,
		components,
		setComponents,
		index,
		id,
		moveItem,
		isNewItemAdding,
		onNewAddingItemProps,
		onClick,
		isSelected,
	} = props;

	const { type, id: elementId } = widget || {};

	const itemRef = useRef(null);

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

			const { top, bottom, height } = itemRef.current.getBoundingClientRect();
			const { y } = monitor.getClientOffset();
			const hoverIndex = index;
			const dragIndex = item.index;

			const hoverMiddleY = (bottom - top) / 2;
			const hoverClientY = y - top;

			if (!id || dragIndex === hoverIndex) {
				return;
			}

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			if (!isNewItemAdding) {
				onNewAddingItemProps({ hoveredIndex: hoverIndex });
				moveItem(dragIndex, hoverIndex);

				const data = item;
				data.index = hoverIndex;
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

	const [, drag] = useDrag({
		type,
		item    : { type, id, index },
		collect : (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(itemRef));

	const opacity = isNewItemAdding && !id ? '0.3' : '1';

	const border = isSelected ? '3px dashed blue' : '1px solid silver';

	return (
		<div
			role="presentation"
			ref={itemRef}
			data-handler-id={handlerId}
			onClick={onClick}
			key={elementId}
			className="drag-handle"
			style={{
				opacity,
				border,
				padding : '10px',
				margin  : '10px',
			}}
		>

			<RenderComponents componentType={type} widget={widget} components={components} setComponents={setComponents} elementId={elementId} />

			{['container', 'rootElement'].includes(type) && (
				<ComponentBuilder widget={widget} components={components} setComponents={setComponents} />
			)}
		</div>
	);
}

export default Item;
