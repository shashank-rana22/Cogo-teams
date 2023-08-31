import React, { useState, useEffect } from 'react';

import CardItem from './Card';

export default function ListData({
	selectedData = [],
	setSelectedData = () => {},
	stackData = [],
	dryRun = false,
	reRender = false,
	setReRender = () => {},
	isDelete = false,
	setIsDelete = () => {},
	updatedData = [],
}) {
	let stackedData = stackData;
	const [cardsData, setCardsData] = useState(updatedData);
	useEffect(() => {
		setCardsData(updatedData);
		setIsDelete(false);
		setReRender(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
		stackedData = [];
	}, [reRender]);
	useEffect(() => {
		setCardsData(updatedData);
		setIsDelete(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete]);
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
		const newCardsData = [...cardsData];
		const [draggedItem] = newCardsData.splice(sourceIndex, SOURCE_LENGTH);
		newCardsData.splice(targetIndex, ZERO_INDEX, draggedItem);

		setCardsData(newCardsData);
	};
	return (
		<div>
			{((!dryRun ? undefined : stackedData) || (cardsData)).map((tile, index) => (
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
						originalAllocation={tile.allocationAmount}
						originalTDS={tile.tds}
						reRender={reRender}
						setIsDelete={setIsDelete}
					/>
				</div>
			))}
		</div>
	);
}
