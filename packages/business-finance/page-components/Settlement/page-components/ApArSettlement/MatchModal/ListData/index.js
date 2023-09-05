import React from 'react';

import CardItem from './Card';
import CardHeader from './CardHeader';

const ZERO_VALUE = 0;
export default function ListData({
	selectedData = [],
	setSelectedData = () => {},
	// checkedData,
	// setCheckedData,
	dryRun = false,
	// setDryRun,
	reRender = false,
	// setReRender = () => {},
	// isDelete = false,
	setIsDelete = () => {},
	updatedData = [],
	setUpdatedData,
	// dryRunData,
	checkLoading,
	setUpdateBal,
}) {
	// const [cardsData, setCardsData] = useState(updatedData);
	// const [stackedData, setStackedData] = useState(stackData);
	// useEffect(() => {
	// 	setCardsData(updatedData);
	// 	setIsDelete(false);
	// 	setReRender(false);

	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	// stackedData = [];
	// 	// setStackedData([]);
	// }, [reRender]);
	// useEffect(() => {
	// 	setCardsData(updatedData);
	// 	setIsDelete(false);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [isDelete]);

	const handleDragStart = (e, index) => {
		e.dataTransfer.setData('text/plain', index.toString());
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e, targetIndex) => {
		e.preventDefault();
		const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
		const ZERO_INDEX = 0;
		const SOURCE_LENGTH = 1;
		const newCardsData = [...updatedData];
		const [draggedItem] = newCardsData.splice(sourceIndex, SOURCE_LENGTH);
		newCardsData.splice(targetIndex, ZERO_INDEX, draggedItem);
		setUpdatedData(newCardsData);
	};

	return (
		<div>
			<CardHeader />
			{
				checkLoading
					? (<div>Please wait...</div>)

					: updatedData?.map((tile, index) => (
						<div
							key={tile.id}
							draggable
							onDragStart={(e) => handleDragStart(e, index)}
							onDragOver={handleDragOver}
							onDrop={(e) => handleDrop(e, index)}
						>
							<CardItem
								itm={tile}
								setSelectedData={setSelectedData}
								selectedData={selectedData}
								originalAllocation={selectedData[index]?.allocationAmount || ZERO_VALUE}
								originalTDS={selectedData[index]?.tds || ZERO_VALUE}
								reRender={reRender}
								setIsDelete={setIsDelete}
								dryRun={dryRun}
								updatedData={updatedData}
								setUpdateBal={setUpdateBal}
							/>
						</div>
					))

			}
		</div>
	);
}
