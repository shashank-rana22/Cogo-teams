import React from 'react';

function Entity({ itemData }) {
	const { advanceDocumentBuyerAddress } = itemData || {};
	const { entityCode } = advanceDocumentBuyerAddress || {};
	return (
		<div>
			{entityCode}
		</div>
	);
}

export default Entity;
