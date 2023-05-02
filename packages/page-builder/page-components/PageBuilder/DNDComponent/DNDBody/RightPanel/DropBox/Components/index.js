import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import VALID_ITEM_TYPES from '../../../../../../../configurations/accept-items';
import useGetHelperFunctions from '../../../../../../../helpers/useGetHelperFunctions';

import RenderComponent from './RenderComponent';
import SideToolBar from './SideToolBar';
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
		modeType,
	} = props;

	const itemRef = useRef(null);

	const { id, component } = rowData || {};

	const { type, isDraggingPreview } = component || {};

	const { handleDelete, handleCopy, handleSelectRow, handleAddSlides } = useGetHelperFunctions({
		setPageConfiguration,
		setSelectedRow,
		setSelectedItem,
		setParentComponentId,
		setShowContentModal,
		setSelectedColumn,
		setSelectedNestedColumn,
		modeType,
	});

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

	const opacity = isNewItemAdding && !id ? '0.3' : '1';

	const border = isSelected && '5px solid red';

	drag(drop(itemRef));

	return (
		<div
			role="presentation"
			ref={itemRef}
			data-handler-id={handlerId}
			onClick={(e) => handleSelectRow(e, rowData, id, index)}
			key={id}
			style={{
				opacity,
				border,
			}}
			className={styles.element_container}
		>

			<RenderComponent
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
				elementId={id}
				index={index}
				type={type}
				isDraggingPreview={isDraggingPreview}
				modeType={modeType}
			/>

			{modeType === 'edit' && (
				<div role="presentation" className={styles.change}>
					<SideToolBar
						rowData={rowData}
						pageConfiguration={pageConfiguration}
						handleAddSlides={handleAddSlides}
						handleCopy={handleCopy}
						handleDelete={handleDelete}
						component={component}
						type={type}
					/>
				</div>
			)}

		</div>
	);
}

export default Components;
