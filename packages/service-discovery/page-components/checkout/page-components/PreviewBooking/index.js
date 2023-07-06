import { useState, useEffect } from 'react';

import AdditionalContent from './components/AdditionalContent';
import BookingPreview from './components/BookingPreview';
import styles from './styles.module.css';

const FIRST_INDEX = 0;

function PreviewBooking({ data = {}, primaryService = {} }) {
	const { detail = {} } = data || {};

	const { margin_approval_request_remarks = [] } = detail;

	const { hs_code, cargo_readiness_date, cargo_value	} = primaryService;

	const [showBreakup, setShowBreakup] = useState(false);
	const [additionalRemark, setAdditionalRemark] = useState('');
	const [cargoDetails, setCargoDetails] = useState({ cargo_readiness_date: null, cargo_value: null, hs_code: null });
	const [agreeTandC, setAgreeTandC] = useState(false);

	useEffect(() => {
		setAdditionalRemark(margin_approval_request_remarks[FIRST_INDEX] || '');

		setCargoDetails({ hs_code, cargo_readiness_date, cargo_value });
	}, [cargo_readiness_date, cargo_value, hs_code, margin_approval_request_remarks]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Preview Booking</div>

			<BookingPreview data={data} setShowBreakup={setShowBreakup} showBreakup={showBreakup} />

			<AdditionalContent
				value={additionalRemark}
				onChange={setAdditionalRemark}
				cargoDetails={cargoDetails}
				setCargoDetails={setCargoDetails}
				agreeTandC={agreeTandC}
				setAgreeTandC={setAgreeTandC}
			/>
		</div>
	);
}

export default PreviewBooking;
