import { isEmpty } from '@cogoport/utils';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import ButtonComponent from '../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../commons/widgets/ImageComponent';
import TextComponent from '../../../commons/widgets/TextComponent';

const ITEM_TYPES = {
	text      : 'text',
	button    : 'button',
	image     : 'image',
	container : 'container',
};

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

	const { type, id: elementId } = widget;

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

	// const rootComponents = components.filter((item) => !item.parentId);

	console.log('sdijisdj', components);

	// const renderedComponents = rootComponents.map((component) => (
	// 	<ComponentBuilder
	// 		key={component.id}
	// 		component={component}
	// 		components={components}
	// 		setComponents={setComponents}
	// 	/>
	// ));

	return (
		<div
			role="presentation"
			ref={itemRef}
			data-handler-id={handlerId}
			onClick={onClick}
			className="drag-handle"
			style={{
				opacity,
				border,
				padding : '10px',
				margin  : '10px',
			}}
		>

			{/* {renderedComponents} */}
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
			{type === 'conatiner' && (
				<div>container</div>
			)}
		</div>
	);
}

export default Item;
