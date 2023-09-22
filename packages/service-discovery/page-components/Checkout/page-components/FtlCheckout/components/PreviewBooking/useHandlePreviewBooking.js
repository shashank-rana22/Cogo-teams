import { useState } from 'react';

const useHandlePreviewBooking = () => {
	const [showBreakup, setShowBreakup] = useState(false);

	const [agreeTandC, setAgreeTandC] = useState(false);

	return {

		setShowBreakup,
		showBreakup,
		agreeTandC,
		setAgreeTandC,
	};
};

export default useHandlePreviewBooking;
