/* eslint-disable max-len */
import { IcMCrossInCircle, IcMDuplicate } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v1 as uuid } from 'uuid';

// import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import VALID_ITEM_TYPES from '../../../configurations/accept-items';

import RenderComponents from './RenderComponent';
import styles from './styles.module.css';

function ComponentBuilder({ widget, components, setComponents, selectedRow, childId, setChildId, setSelectedItem }) {
	const { children, style, id: componentId } = widget || {};
	const { id: selectedRowId } = selectedRow || {};

	if (isEmpty(children)) {
		return <div style={{ height: '150px' }}> Blocks loading...</div>;
	}

	return (
		<div style={style}>

			{ (children || []).map((childComponent, idx) => {
				const { id, style: allStyles, icon, attributes, type } = childComponent || {};

				const isChildSelected = childId === id && componentId === selectedRowId && type;

				const border = isChildSelected ? '2px solid red' : allStyles.border;

				const handleClick = (e) => {
					e.stopPropagation();
					setChildId(id);
				};
				return (

					<div
						role="presentation"
						className={styles.content_container}
						style={{ ...allStyles, border, background: 'lightYellow' }}
						onClick={(e) => handleClick(e)}
					>

						{!type ? (
							<div
								role="presentation"
								onClick={attributes.onClick}
							>
								{icon}
							</div>
						) : <RenderComponents componentType={type} widget={childComponent} components={components} setComponents={setComponents} elementId={id} childId={childId} selectedRow={selectedRow} setSelectedItem={setSelectedItem} index={idx} /> }

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
		setSelectedRow,
		isSelected,
		selectedRow,
		setShowContentModal,
		setParentComponentId,
		setSelectedItem,
		selectedItem,
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
		accept: Object.keys(VALID_ITEM_TYPES),
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

		setSelectedRow({});
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

	const handleClick = (e) => {
		e.stopPropagation();
		setSelectedRow({ ...widget, id, index });

		setChildId('');
		setSelectedItem({});
	};

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
			onClick={(e) => handleClick(e)}
			key={elementId}
			style={{
				opacity,
				border,
				backgroundColor: 'lavender',
			}}
			className={styles.element_Container}
		>

			<div>
				{type === 'container'
					? <ComponentBuilder widget={widget} components={components} setComponents={setComponents} selectedRow={selectedRow} childId={childId} setChildId={setChildId} setSelectedItem={setSelectedItem} />
					: <RenderComponents componentType={type} widget={widget} components={components} setComponents={setComponents} elementId={elementId} childId={childId} selectedRow={selectedRow} setSelectedItem={setSelectedItem} index={index} />}
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
