import React from 'react';

import CardItem from './Card';

export default function ListData({ selectedData = [], setSelectedData }) {
	// const [restEdit, setRestEdit] = useState(false);
	// const [cardsData, setCardsData] = useState(updatedData);
	// useEffect(() => {
	// 	setCardsData(updatedData); // Update cardsData whenever updatedData changes
	// }, [updatedData]);
	return (
		<div>
			{selectedData.map((tile) => (
				<div
					key={tile.id}
				>
					<CardItem
						itm={tile}
						setSelectedData={setSelectedData}
						selectedData={selectedData}
						originalAllocation={tile.allocationAmount}
						originalTDS={tile.tds}
						// handleClick={handleClick}
						// setEditedValue={setEditedValue}
						// setEditeable={setEditeable}
						// isEditable={isEditable}
						// handleCrossClick={handleCrossClick}
						// setAllocationValue={setAllocationValue}
						// onChangeTableBodyCheckbox={onChangeTableBodyCheckbox}
						// setCheckedIdData={setCheckedIdData}
						// type={type}
						// setRestEdit={setRestEdit}
						// restEdit={restEdit}
						// changeData={changeData}
						// setEditedNostro={setEditedNostro}
						// nostroButton={nostroButton}
						// setCanCheck={setCanCheck}
						// isVietnamUser={isVietnamUser}
					/>
				</div>
			))}
		</div>
	);
}
