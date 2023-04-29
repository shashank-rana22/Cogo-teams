/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useEffect,
	useState,
} from 'react';
import { useDrop } from 'react-dnd';

import VALID_ITEM_TYPES from '../../../../../../configurations/accept-items';
import useGetActiveBackgroundColor from '../../../../../../helpers/useGetActiveBackgroundColor';
import useGetMemoStagedItems from '../../../../../../helpers/useGetMemoStageItems';

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
	handleUnselectItem,
}) {
	const [stageItems, setStageItems] = useState(pageConfiguration);

	const [newAddingItemProps, setNewAddingItemProps] = useState({
		hoveredIndex   : 0,
		shouldAddBelow : false,
	});

	const { memoItems } = useGetMemoStagedItems({
		stageItems,
		setPageConfiguration,
		isNewItemAdding,
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
		setStageItems,
		setNewAddingItemProps,
		newAddingItemProps,
	});

	const { hoveredIndex, shouldAddBelow } = newAddingItemProps || {};

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

	const isActive = canDrop && isOver;

	const backgroundColor = useGetActiveBackgroundColor({ pageConfiguration, isActive, canDrop });

	useEffect(() => {
		// if (!isEqual(stageItems, component)) {
		setStageItems(pageConfiguration);
		// }
	}, [pageConfiguration]);

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
