import { useCallback } from 'react';

const useGetShiftComponent = ({ stageItems, setStageItems }) => {
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

	return {
		moveItem,
	};
};

export default useGetShiftComponent;
