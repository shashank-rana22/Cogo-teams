import React from 'react';

interface EntityType {
	entityCode:string
}
interface ItemTypes {
	advanceDocumentBuyerAddress:EntityType,
}
interface PropsType {
	itemData :ItemTypes,
}

function Entity({ itemData }:PropsType) {
	const { advanceDocumentBuyerAddress } = itemData || {};
	const { entityCode } = advanceDocumentBuyerAddress || {};
	return (
		<div>
			{entityCode}
		</div>
	);
}

export default Entity;
