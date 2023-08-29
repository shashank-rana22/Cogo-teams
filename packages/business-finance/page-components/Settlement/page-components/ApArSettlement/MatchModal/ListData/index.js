import React from 'react';

import CardItem from './Card';

export default function ListData({
	selectedData = [],
	setSelectedData,
	stackData,
	// reRender,
	// setReRender
}) {
	// console.log('stack', stackData);
	// console.log('what', reRender);
	const updatedData = selectedData.map((item) => ({ ...item }));
	// console.log('from card', updatedData);
	return (
		<div>
			{(stackData || (updatedData)).map((tile) => (
				<div
					key={tile.id}
				>
					<CardItem
						itm={tile}
						setSelectedData={setSelectedData}
						selectedData={selectedData}
						originalAllocation={tile.allocationAmount}
						originalTDS={tile.tds}
						updatedData={updatedData}
					/>
				</div>
			))}
		</div>
	);
}
