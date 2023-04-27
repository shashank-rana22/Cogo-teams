import { Tooltip } from '@cogoport/components';
import { IcMCrossInCircle, IcMDuplicate, IcMPlusInCircle } from '@cogoport/icons-react';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v1 as uuid } from 'uuid';

import 'react-resizable/css/styles.css';
import VALID_ITEM_TYPES from '../../../configurations/accept-items';

import ComponentBuilder from './ComponentBuilder';
import RenderComponents from './RenderComponent';
import styles from './styles.module.css';

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
	} = props;
	const [childId, setChildId] = useState('');

	console.log('sdisk', components);

	const { type, id: elementId } = widget || {};

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

			const newAttributes = !childType ? {
				onClick: () => handleSubmitClick({ childrenId: item.id, parentId: newId }),
			} : attributes;

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

	const handleAddItem = ({ childrenId, parentId }) => {
		setParentComponentId({ childId: childrenId, parentId });
		setShowContentModal(true);
	};

	const handleAddSlides = (e, itemList) => {
		e.stopPropagation();
		const { parentId, id: sId } = itemList || {};

		const data = components;

		const selectedComponentIndex = (data.layouts || []).findIndex(
			(component) => component.id === sId,
		);

		const childrenId = (data.layouts[selectedComponentIndex].children || []).length;

		data.layouts[selectedComponentIndex].children = [...data.layouts[selectedComponentIndex].children, {
			id         : childrenId,
			width      : '100%',
			parentId,
			isRendered : false,
			style      : {
				border         : '1px dashed #9ab7fe',
				display        : 'flex',
				justifyContent : 'center',
				alignItems     : 'center',
			},
			icon       : <IcMPlusInCircle style={{ cursor: 'pointer', fill: '#222' }} width={20} height={20} />,
			attributes : {
				onClick: () => handleAddItem({ childrenId, parentId }),
			},
		},
		];

		setComponents((prev) => ({ ...prev, layouts: data.layouts }));
	};

	const opacity = isNewItemAdding && !id ? '0.3' : '1';

	const border = isSelected && '1px solid red';

	const handleClick = (e) => {
		e.stopPropagation();
		setSelectedRow({ ...widget, id, index });
		setSelectedItem({ ...widget, id, index });

		// setChildId('');
	};

	console.log('sdk ::', widget);

	return (
		<div
			role="presentation"
			ref={itemRef}
			data-handler-id={handlerId}
			onClick={(e) => handleClick(e)}
			key={elementId}
			style={{
				opacity,
				border,
			}}
			className={styles.element_container}
		>

			<div>
				{['container', 'card', 'formSample'].includes(type)
					? (
						<ComponentBuilder
							widget={widget}
							components={components}
							setComponents={setComponents}
							selectedRow={selectedRow}
							childId={childId}
							setChildId={setChildId}
							setSelectedItem={setSelectedItem}
							setParentComponentId={setParentComponentId}
							setShowContentModal={setShowContentModal}
						/>
					)
					: (
						<div
							style={{
								...(type === 'divider'
									? {} : widget.style),
							}}
						>
							<RenderComponents
								componentType={type}
								widget={widget}
								components={components}
								setComponents={setComponents}
								elementId={elementId}
								childId={childId}
								selectedRow={selectedRow}
								setSelectedItem={setSelectedItem}
								index={index}
								setChildId={setChildId}
								setParentComponentId={setParentComponentId}
								setShowContentModal={setShowContentModal}
							/>
						</div>
					)}
			</div>

			<div role="presentation" className={styles.change}>
				<IcMCrossInCircle
					height="24px"
					width="24px"
					cursor="pointer"
					onClick={(e) => handleDelete(e, widget)}
				/>
				<IcMDuplicate
					height="24px"
					width="24px"
					cursor="pointer"
					onClick={(e) => handleCopy(e, widget)}
				/>

				{type === 'carousel' && (
					<Tooltip content="Click here to add more slides" placement="bottom">
						<IcMPlusInCircle
							height="24px"
							width="24px"
							cursor="pointer"
							onClick={(e) => handleAddSlides(e, widget)}
						/>
					</Tooltip>
				)}

			</div>
		</div>
	);
}

export default RightPanel;
