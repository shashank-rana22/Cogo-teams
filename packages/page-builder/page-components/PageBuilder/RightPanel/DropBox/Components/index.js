import { Tooltip } from '@cogoport/components';
import { IcMCrossInCircle, IcMDuplicate, IcMPlusInCircle } from '@cogoport/icons-react';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v1 as uuid } from 'uuid';

import 'react-resizable/css/styles.css';
import VALID_ITEM_TYPES from '../../../../../configurations/accept-items';

import ComponentBuilder from './ComponentBuilder';
import RenderComponents from './RenderComponent';
import styles from './styles.module.css';

function Components(props) {
	const {
		rowData,
		pageConfiguration,
		setPageConfiguration,
		index,
		moveItem,
		isNewItemAdding,
		onNewAddingItemProps,
		isSelected,
		setShowContentModal,
		setParentComponentId,
		selectedRow,
		setSelectedRow,
		selectedItem,
		setSelectedItem,
		selectedColumn,
		setSelectedColumn,
		selectedNestedColumn,
		setSelectedNestedColumn,
	} = props;

	const { id, component } = rowData || {};

	const { type } = component || {};

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
		const data = pageConfiguration;
		const selectedComponentIndex = (data.layouts || []).findIndex((stageItem) => (stageItem.id === sId));
		data.layouts.splice(selectedComponentIndex, 1);

		setPageConfiguration(() => ({ ...data }));

		setSelectedRow({});
		setSelectedItem({});
	};

	const handleSubmitClick = ({ childrenId, parentId }) => {
		setParentComponentId({ childId: childrenId, parentId });

		setShowContentModal(true);
	};

	const handleCopy = (e, itemList) => {
		e.stopPropagation();

		const { id: sId, parentId } = itemList || {};

		const { children } = component || {};

		const newId = uuid();

		const data = pageConfiguration;

		const selectedComponentIndex = (data.layouts || []).findIndex((item) => (item.id === sId));

		const duplicateChildren = (children || []).map((item) => {
			const { component: parentComponent } = item || {};
			const { attributes, type: childType } = parentComponent || {};

			const newAttributes = !childType ? {
				onClick: () => handleSubmitClick({ childrenId: item.id, parentId: newId }),
			} : attributes;

			return ({ ...item, parentId: newId, component: { ...item.component, attributes: newAttributes } });
		});

		const duplicateData = parentId ? {
			...itemList,
			component: {
				...itemList.component,
				children: duplicateChildren,
			},
			id       : data.layouts.length + 1,
			parentId : newId,
			type     : 'ROW',
		} : {
			...itemList,
			id: data.layouts.length + 1,
		};

		setPageConfiguration((prev) => ({
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

		const data = pageConfiguration;

		const selectedComponentIndex = (data.layouts || []).findIndex(
			(sComponentId) => sComponentId.id === sId,
		);

		const childrenId = (data.layouts[selectedComponentIndex].component.children || []).length;

		data.layouts[selectedComponentIndex].component.children = [
			...data.layouts[selectedComponentIndex].component.children,
			{
				id        : childrenId,
				width     : '100%',
				parentId,
				component : {
					style: {
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
			},
		];

		setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));
	};

	const opacity = isNewItemAdding && !id ? '0.3' : '1';

	const border = isSelected && '5px solid red';

	const handleClick = (e, itemList) => {
		e.stopPropagation();
		setSelectedRow({ ...itemList, id, index });
		setSelectedColumn({});
		setSelectedNestedColumn({});
		setSelectedItem({});
	};

	return (
		<div
			role="presentation"
			ref={itemRef}
			data-handler-id={handlerId}
			onClick={(e) => handleClick(e, rowData)}
			key={id}
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
							widget={rowData}
							rowData={rowData}
							pageConfiguration={pageConfiguration}
							setPageConfiguration={setPageConfiguration}
							setParentComponentId={setParentComponentId}
							setShowContentModal={setShowContentModal}
							selectedItem={selectedItem}
							setSelectedItem={setSelectedItem}
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
							selectedColumn={selectedColumn}
							setSelectedColumn={setSelectedColumn}
							selectedNestedColumn={selectedNestedColumn}
							setSelectedNestedColumn={setSelectedNestedColumn}
						/>
					)
					: (
						<div
							style={{
								...(type === 'divider'
									? {} : rowData.style),
							}}
						>
							<RenderComponents
								componentType={type}
								widget={rowData}
								rowData={rowData}
								pageConfiguration={pageConfiguration}
								setPageConfiguration={setPageConfiguration}
								elementId={id}
								index={index}
								setParentComponentId={setParentComponentId}
								setShowContentModal={setShowContentModal}
								columnData={{}}
								selectedItem={selectedItem}
								setSelectedItem={setSelectedItem}
								selectedRow={selectedRow}
								setSelectedRow={setSelectedRow}
								selectedColumn={selectedColumn}
								setSelectedColumn={setSelectedColumn}
								selectedNestedColumn={selectedNestedColumn}
								setSelectedNestedColumn={setSelectedNestedColumn}
							/>
						</div>
					)}
			</div>

			<div role="presentation" className={styles.change}>
				<IcMCrossInCircle
					height="24px"
					width="24px"
					cursor="pointer"
					onClick={(e) => handleDelete(e, rowData)}
				/>
				<IcMDuplicate
					height="24px"
					width="24px"
					cursor="pointer"
					onClick={(e) => handleCopy(e, rowData)}
				/>

				{type === 'carousel' && (
					<Tooltip content="Click here to add more slides" placement="bottom">
						<IcMPlusInCircle
							height="24px"
							width="24px"
							cursor="pointer"
							onClick={(e) => handleAddSlides(e, rowData)}
						/>
					</Tooltip>
				)}

			</div>
		</div>
	);
}

export default Components;
