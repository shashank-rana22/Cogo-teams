import React, { useState, useEffect } from 'react';

import CardItem from './Card';

export default function ListData({
	selectedData = [],
	setSelectedData,
	stackData,
	// setStackData,
	dryRun,
	reRender,
	setReRender,
	isDelete,
	setIsDelete,
	updatedData,
}) {
	let STACK_DATA = stackData;
	// console.log('stack', stackData);
	// console.log('what', reRender);
	// const [updatedData, setUpdatedData] = useState([...selectedData]);
	// const updatedData = selectedData.map((item) => ({ ...item }));
	const [cardsData, setCardsData] = useState(updatedData);
	// console.log('from card', updatedData);
	useEffect(() => {
		setCardsData(updatedData);
		setIsDelete(false);
		setReRender(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
		STACK_DATA = [];
		// setStackData('');
		// Update cardsData whenever updatedData changes
	}, [reRender]);
	useEffect(() => {
		setCardsData(updatedData);
		setIsDelete(false);
		// setReRender(false);
		// stackData = [];
		// setStackData('');
		// Update cardsData whenever updatedData changes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete]);
	// useEffect(() => {
	// 	if (dryRun) {
	// 		stackData = stackData || cardsData;
	// 		setCardsData(stackData);
	// 	} else {
	// 		setCardsData(updatedData);
	// 	}
	// 	// setReRender(false);
	// 	// stackData = [];
	// 	// setStackData('');
	// 	// Update cardsData whenever updatedData changes
	// }, [dryRun]);
	const handleDragStart = (e, index) => {
		e.dataTransfer.setData('text/plain', index.toString());
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		// console.log('dver');
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
	//   if(dryRun){
	// 	stackData = stackData || cardsData;
	// 	setCardsData(stackData);
	//   }
	// console.log('stack', STACK_DATA);
	/* {((cardsData)).map((tile, index) => ( */
	return (
		<div>
			{((!dryRun ? undefined : STACK_DATA) || (cardsData)).map((tile, index) => (
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
						updatedData={updatedData}
						reRender={reRender}
						cardsData={cardsData}
						setIsDelete={setIsDelete}
					/>
				</div>
			))}
		</div>
	);
}
