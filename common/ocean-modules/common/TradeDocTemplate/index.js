import { forwardRef } from 'react';

import BluetideHbBL from './BluetideHbBL';
import CargoArrivalNotice from './CargoArrivalNotice';

function TradeDocTemplate(
	{
		documentType = 'bluetide_hbl',
		initialValues = null,
		mode = 'read',
	},

	ref,
) {
	switch (documentType) {
		case 'bluetide_hbl':
			return (
				<BluetideHbBL
					mode={mode}
					ref={ref}
					initialValues={initialValues}
				/>
			);
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
