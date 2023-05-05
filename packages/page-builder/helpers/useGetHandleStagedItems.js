/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

const useGetHandleStagedItems = ({
	stageItems,
	isNewItemAdding,
	isOver,
	shouldAddBelow,
	hoveredIndex,
	handleUnselectItem,
	setStageItems,
	draggingItemType,
}) => {
	const handleStagedItem = useCallback(() => {
		const { layouts } = stageItems || {};

		const stagedItems = (layouts || []).filter(({ id }) => !!id);

		if (isNewItemAdding) {
			if (isOver && isNewItemAdding) {
				const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;

				if (startIndex === hoveredIndex && hoveredIndex !== 0 && startIndex !== 0) {
					return;
				}

				handleUnselectItem();

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

	return { handleStagedItem };
};

export default useGetHandleStagedItems;
