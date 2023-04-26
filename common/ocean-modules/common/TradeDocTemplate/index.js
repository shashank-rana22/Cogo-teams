import { forwardRef } from 'react';

import CargoArrivalNotice from './CargoArrivalNotice';

function TradeDocTemplate(
	{
		documentType = 'bluetide_hbl',
		initialValues = null,
	},
	ref,
) {
	switch (documentType) {
		case 'container_arrival_notice':
			return (
				<CargoArrivalNotice
					ref={ref}
					initialValues={initialValues}
				/>
			);

		default:
			return <p>No template available</p>;
	}
}

export default forwardRef(TradeDocTemplate);
