/* eslint-disable max-len */
import { IcMCrossInCircle, IcMDuplicate } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v1 as uuid } from 'uuid';

// import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import RenderComponents from './RenderComponent';
import styles from './styles.module.css';

const ITEM_TYPES = {
	text        : 'text',
	button      : 'button',
	image       : 'image',
	container   : 'container',
	rootElement : 'rootElement',
};

function ComponentBuilder({ widget, components, setComponents, selectedItem, childId, setChildId }) {
	const { type: componetType, children, style, id: componentId } = widget || {};
	const { id: selectedItemId } = selectedItem || {};

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
				const { id, style: allStyles } = childComponent || {};
				const { content = '', attributes = {} } = childComponent.properties || {};
				const { icon, type } = content || {};
				const isChildSelected = childId === id && componentId === selectedItemId && type;
				const border = isChildSelected ? '1px solid red' : allStyles.border;

				return (

					<div
						role="presentation"
						className={styles.content_container}
						style={{ ...allStyles, border }}
						onClick={() => setChildId(id)}
					>

						{!type ? (
							<div
								role="presentation"
								onClick={attributes.onClick}
							>
								{icon}
							</div>
						) : <RenderComponents componentType={type} widget={childComponent} components={components} setComponents={setComponents} elementId={id} childId={childId} selectedItem={selectedItem} /> }

					</div>
				);
			})}
		</div>
	);
}

function RightPanel(props) {
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
		setSelectedItem,
		isSelected,
		selectedItem,
		setShowContentModal,
		setParentComponentId,
	} = props;
	const [childId, setChildId] = useState('');

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

	const handleDelete = (e, itemList) => {
		e.stopPropagation();

		const { id: sId } = itemList || {};
		const data = components;
		const selectedComponentIndex = (data.layouts || []).findIndex((stageItem) => (stageItem.id === sId));
		data.layouts.splice(selectedComponentIndex, 1);

		setComponents(() => ({ ...data }));

		setSelectedItem({});
	};

	const handleSubmitClick = ({ childrenId, parentId }) => {
		setParentComponentId({ childId: childrenId, parentId });

		setShowContentModal(true);
	};

	const handleCopy = (e, itemList) => {
		e.stopPropagation();

		const { id: sId, parentId, children } = itemList || {};
		const newId = uuid();
		const data = components;
		const selectedComponentIndex = (data.layouts || []).findIndex((component) => (component.id === sId));

		const duplicateChildren = (children || []).map((item) => {
			const { properties } = item || {};
			const { content, attributes } = properties || {};
			const { type: childType } = content || {};

			const newAttributes = !childType ? { onClick: () => handleSubmitClick({ childrenId: item.id, parentId: newId }) } : attributes;

			return ({ ...item, parentId: newId, properties: { ...properties, attributes: newAttributes } });
		});

		const duplicateData = parentId ? {
			...itemList,
			children : duplicateChildren,
			id       : data.layouts.length + 1,
			parentId : newId,
		} : {
			...itemList,
			id: data.layouts.length + 1,
		};

		setComponents((prev) => ({
			...prev,
			layouts: [...data.layouts.slice(0, selectedComponentIndex + 1),
				{
					...duplicateData,
				},
				...data.layouts.slice(selectedComponentIndex + 1)],
		}));
	};

	const opacity = isNewItemAdding && !id ? '0.3' : '1';

	const border = isSelected && '1px solid #88cad1';

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
			style={{
				opacity,
				border,
			}}
			className={styles.element_Container}
		>

			<div>
				{type === 'container'
					? <ComponentBuilder widget={widget} components={components} setComponents={setComponents} selectedItem={selectedItem} childId={childId} setChildId={setChildId} />
					: <RenderComponents componentType={type} widget={widget} components={components} setComponents={setComponents} elementId={elementId} childId={childId} selectedItem={selectedItem} />}
			</div>

			<div role="presentation" className={styles.change}>
				<IcMCrossInCircle height="24px" width="24px" cursor="pointer" onClick={(e) => handleDelete(e, widget)} />
				<IcMDuplicate height="24px" width="24px" cursor="pointer" onClick={(e) => handleCopy(e, widget)} />
			</div>
		</div>
	// </ResizableBox>
	);
}

export default RightPanel;
