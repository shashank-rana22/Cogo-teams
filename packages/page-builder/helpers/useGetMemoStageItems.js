/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

import Components from '../page-components/PageBuilder/DNDComponent/DNDBody/RightPanel/DropBox/Components';

import useGetHandleAddingItemPropsChange from './useGetHandleAddingItemPropsChange';
import useGetShiftComponent from './useGetShiftComponent';

const useGetMemoStagedItems = ({
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
}) => {
	const { moveItem } = useGetShiftComponent({ stageItems, setStageItems });

	const { handleNewAddingItemPropsChange } = 	useGetHandleAddingItemPropsChange({
		setNewAddingItemProps,
		newAddingItemProps,
	});

	const memoItems = useMemo(() => (stageItems.layouts || [])?.map((item, index) => {
		const { id } = item || {};

		return (
			<div
				style={{ position: 'relative' }}
				key={id}
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
					modeType={modeType}
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
		modeType,
	]);

	return { memoItems };
};

export default useGetMemoStagedItems;
