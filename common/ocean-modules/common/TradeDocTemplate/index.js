import React from 'react';

import CargoArrivalNotice from './CargoArrivalNotice';

function TradeDocTemplate(
	{
		mode = 'read',
		documentType = 'bluetide_hbl',
		initialValues = null,
		noFormat = false,
	},
	ref,
) {
	switch (documentType) {
		case 'container_arrival_notice':
			return (
				<CargoArrivalNotice
					ref={ref}
					noFormat={noFormat}
					initialValues={initialValues}
					mode={mode}
				/>
			);

		default:
			return <p>No template available</p>;
	}
}

export default TradeDocTemplate;
