import { useState } from 'react';

import creditNoteControls from '../../helpers/controls';

function useGetControls({
	services,
	servicesIDs,
	invoiceData,
	invoice,
}) {
	const [allChargeCodes, setAllChargeCodes] = useState({});
	const control = creditNoteControls({
		services,
		handleChange,
		setAllChargeCodes,
		allChargeCodes,
		isEdit,
	});

	return (
		<div>useGetControls</div>
	);
}
export default useGetControls;
