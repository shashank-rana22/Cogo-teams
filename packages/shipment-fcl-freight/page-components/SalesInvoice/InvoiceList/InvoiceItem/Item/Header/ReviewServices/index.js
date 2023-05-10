import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

// import useUpdateInvoiceStatus from '../../../../../../../hooks/useUpdateInvoiceStatus';
import Confirmation from './Confirmation';
import styles from './styles.module.css';
// import LinersExchangeRateConfirm from './LinersExchangeRate';

function ReviewServices({
	showReview = false,
	setShowReview = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const changeApplicableState =		invoice?.exchange_rate_state === 'liners_exchange_rate'
		&& invoice?.is_liners_exchange_rate_state;

	const [value, setValue] = useState(false);
	const [showExchangeRateConfirmation, setShowExchangeRateConfirmation] =		useState(changeApplicableState);

	// const { updateInvoiceStatus, loading } = useUpdateInvoiceStatus({
	// 	invoice,
	// 	setShowReview,
	// 	refetch,
	// 	status: 'reviewed',
	// 	changeApplicableState,
	// });

	return (
		<Modal show={showReview} closable={false}>
			<Modal.Header title="MARK AS REVIEWED" />
			<Modal.Body>
				<div className={styles.Form}>
					<Confirmation value={value} setValue={setValue} />
				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary md"
					style={{ marginRight: 12 }}
					onClick={() => setShowReview(false)}
				>
					Close
				</Button>

				<Button
					className="primary md reviewed"
				>
					Reviewed
				</Button>

			</Modal.Footer>
		</Modal>
	);
	// showExchangeRateConfirmation ? (
	// <LinersExchangeRateConfirm
	// 	invoice={invoice}
	// 	setShowExchangeRateConfirmation={setShowExchangeRateConfirmation}
	// 	showExchangeRateConfirmation={showExchangeRateConfirmation}
	// 	setShow={setShowReview}
	// />
	// ) : (

	// );
}

export default ReviewServices;
