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
	modeType,
	previewMode,
	isMobile,
}) {
	const [stageItems, setStageItems] = useState(pageConfiguration);

	const [newAddingItemProps, setNewAddingItemProps] = useState({
		hoveredIndex   : 0,
		shouldAddBelow : false,
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
		modeType,
		handleUnselectItem,
		previewMode,
		isMobile,
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

				handleUnselectItem();

				if (startIndex === hoveredIndex && hoveredIndex !== 0 && startIndex !== 0) {
					return;
				}

				setStageItems((prev) => ({
					...prev,
					layouts: [
						...stagedItems.slice(0, startIndex),
						{
							component: {
								type              : draggingItemType,
								isDraggingPreview : true,
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

	const className = previewMode === 'mobile' ? `${styles.mobile_container}` : `${styles.container}`;

	return (
		<div
			ref={dropRef}
			className={className}
			role="presentation"
			onClick={handleUnselectItem}
			style={{
				...pageConfiguration.style,
				backgroundColor,
			}}
		>
			{modeType === 'edit' && (
				<div>
					{isActive ? 'Release to drop' : 'Drag a box here'}
				</div>
			)}
			{memoItems}
		</div>
	);
}

export default DropBox;
