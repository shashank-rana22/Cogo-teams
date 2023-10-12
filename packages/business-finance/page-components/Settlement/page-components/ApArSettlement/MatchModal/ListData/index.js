import { Placeholder } from '@cogoport/components';
import React from 'react';

import CardItem from './Card';
import CardHeader from './CardHeader';

const ZERO_VALUE = 0;
const LENGTH = 4;
const TIMES_TO_RENDER = [...new Array(LENGTH).keys()];
const TRUNCATE_LENGTH = 10;
export default function ListData({
	selectedData = [],
	setSelectedData = () => {},
	dryRun = false,
	reRender = false,
	setIsDelete = () => {},
	updatedData = [],
	setUpdatedData = () => {},
	checkLoading = false,
	setUpdateBal = () => {},
	setCanSettle = () => {},
	loading = () => {},
}) {
	const handleDragStart = (e, index) => {
		e?.dataTransfer?.setData('text/plain', index.toString());
	};

	const handleDragOver = (e) => {
		e?.preventDefault();
	};

	const handleDrop = (e, targetIndex) => {
		e?.preventDefault();
		const SOURCE_INDEX = parseInt(e.dataTransfer.getData('text/plain'), TRUNCATE_LENGTH);
		const ZERO_INDEX = 0;
		const SOURCE_LENGTH = 1;
		const NEW_CARDS_DATA = [...updatedData];
		const [draggedItem] = NEW_CARDS_DATA.splice(SOURCE_INDEX, SOURCE_LENGTH);
		NEW_CARDS_DATA.splice(targetIndex, ZERO_INDEX, draggedItem);
		setUpdatedData(NEW_CARDS_DATA);
	};
	return (
		<div>
			<CardHeader />
			{
				checkLoading || loading
					? (
						<div>
							{TIMES_TO_RENDER?.map((item) => (
								<Placeholder
									key={item}
									height="50px"
									margin="0px 0px 20px 0px"
								/>
							))}
						</div>
					)
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
								setCanSettle={setCanSettle}
							/>
						</div>
					))

			}
		</div>
	);
}
