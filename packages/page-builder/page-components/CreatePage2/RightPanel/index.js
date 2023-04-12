/* eslint-disable max-len */
import { isEmpty } from '@cogoport/utils';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

// import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import RenderComponents from './RenderComponent';
// import styles from './styles.module.css';

const ITEM_TYPES = {
	text      : 'text',
	button    : 'button',
	image     : 'image',
	container : 'container',
};

function ComponentBuilder({ widget, components, setComponents }) {
	const { children, properties } = widget || {};

	const { styles: style } = properties || {};

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

	// const [state, setState] = useState({
	// 	width  : 800,
	// 	height : 170,
	// });

	// const { width, height } = state || {};

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

	// const onResize = (event, { element, size }) => {
	// 	setState({ width: size.width, height: size.height });
	//   };

	const opacity = isNewItemAdding && !id ? '0.3' : '1';

	const border = isSelected ? '1px solid #88cad1' : 'none';

	return (

	// <ResizableBox
	// 	className="box"
	// 	axis={type === 'container' ? 'none' : 'both'}
	// 	minConstraints={[200, 200]}
	// 	maxConstraints={[800, 400]}
	// 	height={height}
	// 	width={width}
	// 	onResize={onResize}
	// >
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
				// width   : `${width}px`,
				// height  : `${height}px`,

			}}
		>

			{type === 'container'
				? <ComponentBuilder widget={widget} components={components} setComponents={setComponents} />
				: <RenderComponents componentType={type} widget={widget} components={components} setComponents={setComponents} elementId={elementId} />}
		</div>
	// </ResizableBox>
	);
}

export default Item;
