/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useDrop } from 'react-dnd';

import VALID_ITEM_TYPES from '../../../../configurations/accept-items';

import Components from './Components';
import styles from './styles.module.css';

function DropBox({
	pageConfiguration,
	setPageConfiguration,
	addNewItem,
	isNewItemAdding,
	setSelectedRow,
	selectedRow,
	parentComponentId,
	setShowContentModal,
	setParentComponentId,
	setSelectedItem,
	selectedItem,
	selectedColumn,
	setSelectedColumn,
	selectedNestedColumn,
	setSelectedNestedColumn,
}) {
	const [stageItems, setStageItems] = useState(pageConfiguration);

	const [newAddingItemProps, setNewAddingItemProps] = useState({
		hoveredIndex   : 0,
		shouldAddBelow : false,
	});

	const { hoveredIndex, shouldAddBelow } = newAddingItemProps;

	const handleNewAddingItemPropsChange = useCallback(
		(updatedProps) => {
			setNewAddingItemProps({
				...newAddingItemProps,
				...updatedProps,
			});
		},
		[setNewAddingItemProps],
	);

	useEffect(() => {
		// if (!isEqual(stageItems, component)) {
		setStageItems(pageConfiguration);
		// }
	}, [pageConfiguration]);

	const moveItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = stageItems.layouts[dragIndex];
			const hoverItem = stageItems.layouts[hoverIndex];

			setStageItems((prevStageItems) => {
				const updatedStageItems = prevStageItems;
				updatedStageItems.layouts[dragIndex] = hoverItem;
				updatedStageItems.layouts[hoverIndex] = dragItem;
				return updatedStageItems;
			});
		},
		[stageItems, setStageItems],
	);

	const memoItems = useMemo(() => (stageItems.layouts || [])?.map((item, index) => {
		const { id } = item || {};

		return (
			<div
				style={{ position: 'relative' }}
				key={item.id}
				role="presentation"

			>
				<Components
					key={id}
					pageConfiguration={stageItems}
					rowData={item}
					setPageConfiguration={setPageConfiguration}
					index={index}
					moveItem={moveItem}
					isNewItemAdding={isNewItemAdding}
					onNewAddingItemProps={handleNewAddingItemPropsChange}
					isSelected={!!id && id === selectedRow?.id}
					setShowContentModal={setShowContentModal}
					setParentComponentId={setParentComponentId}
					selectedRow={selectedRow}
					setSelectedRow={setSelectedRow}
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					selectedColumn={selectedColumn}
					setSelectedColumn={setSelectedColumn}
					selectedNestedColumn={selectedNestedColumn}
					setSelectedNestedColumn={setSelectedNestedColumn}
				/>
			</div>
		);
	}), [
		stageItems,
		moveItem,
		selectedRow,
		isNewItemAdding,
		selectedItem,
		handleNewAddingItemPropsChange,
	]);

	const [{ canDrop, isOver, draggingItemType }, dropRef] = useDrop({
		accept : Object.keys(VALID_ITEM_TYPES),
		drop   : (droppedItem) => {
			const { id } = droppedItem;
			if (!id) {
				addNewItem(droppedItem, hoveredIndex, shouldAddBelow, parentComponentId, null);
			} else {
				setPageConfiguration(stageItems);
			}
		},
		collect: (monitor) => ({
			isOver           : monitor.isOver(),
			draggingItemType : monitor.getItemType(),
			canDrop          : monitor.canDrop(),
		}),
	});

	useEffect(() => {
		const stagedItems = (stageItems.layouts || []).filter(({ id }) => !!id);
		if (isNewItemAdding) {
			if (isOver && isNewItemAdding) {
				const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;
				setStageItems((prev) => ({
					...prev,
					layouts: [
						...stagedItems.slice(0, startIndex),
						{
							component: {
								type: draggingItemType,
							},
						},
						...stagedItems.slice(startIndex),
					],
				}));
			}
		} else {
			setStageItems((prev) => ({ ...prev, layouts: stagedItems }));
		}
	}, [isOver, draggingItemType, isNewItemAdding, shouldAddBelow, hoveredIndex]);
	const isActive = canDrop && isOver;

	let backgroundColor = pageConfiguration.style['background-color'] || '#f9f9f9';

	if (isActive) {
		backgroundColor = 'grey';
	} else if (canDrop) {
		backgroundColor = 'darkkhaki';
	}

	const handleUnselectItem = () => {
		setSelectedRow({});
		setSelectedItem({});
		setSelectedColumn({});
		setSelectedNestedColumn({});
	};

	return (
		<div
			ref={dropRef}
			className={styles.container}
			role="presentation"
			onClick={handleUnselectItem}
			style={{
				...pageConfiguration.style,
				backgroundColor,
			}}
		>
			{isActive ? 'Release to drop' : 'Drag a box here'}
			{memoItems}
		</div>
	);
}

export default DropBox;
