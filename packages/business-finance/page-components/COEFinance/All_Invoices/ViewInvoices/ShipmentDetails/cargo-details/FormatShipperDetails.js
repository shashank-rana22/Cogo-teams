import React from 'react';

function FormatShipperDetails({ shipperDetails = {} }) {
	const { name = '', address = '' } = shipperDetails || {};
	return (
		<div>
			<div>{name}</div>
			<div>{address}</div>
		</div>
	);
}

export default FormatShipperDetails;
