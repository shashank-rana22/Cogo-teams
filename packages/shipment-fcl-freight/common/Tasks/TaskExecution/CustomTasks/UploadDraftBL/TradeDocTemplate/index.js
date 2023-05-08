import { forwardRef } from 'react';

import BluetideHBL from './BluetideHbBL';

function TradeDocTemplate({ documentType = 'bluetide_hbl', mode = 'read', initialValues = {} }, ref) {
	switch (documentType) {
		case 'bluetide_hbl':
			return (
				<BluetideHBL mode={mode} ref={ref} initialValues={initialValues} />
			);

		default:
			return <p>No template available</p>;
	}
}

export default forwardRef(TradeDocTemplate);
