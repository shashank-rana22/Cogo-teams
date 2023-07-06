import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateInvoiceStatus from '../../../../../../../../../hooks/useUpdateInvoiceStatus';

import Confirmation from './Confirmation';
import LinersExchangeRateConfirm from './LinersExchangeRate';
import styles from './styles.module.css';

function ReviewServices({
	showReview = false,
	setShowReview = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const changeApplicableState = 	(invoice?.exchange_rate_state === 'liners_exchange_rate'
			&& invoice?.is_liners_exchange_rate_state)
		|| (['eta', 'etd'].includes(invoice?.exchange_rate_state)
			&& !invoice?.is_fx_locked);

	const [value, setValue] = useState(false);
	const [showExchangeRateConfirmation, setShowExchangeRateConfirmation] = useState(changeApplicableState);

	const refetchAfterCall = () => {
		setShowReview(false);
		refetch();
	};

	const { loading, apiTrigger } = useUpdateInvoiceStatus({ refetch: refetchAfterCall });

	const handleUpdate = () => {
		apiTrigger({
			id     : invoice?.id,
			status : value ? 'reviewed' : undefined,
			liners_ex_applied:
						changeApplicableState
						&& invoice?.exchange_rate_state === 'liners_exchange_rate'
							? false
							: undefined,
			is_fx_locked: ['eta', 'etd'].includes(invoice?.exchange_rate_state)
				? true
				: undefined,
		});
	};

	return showExchangeRateConfirmation ? (
		<LinersExchangeRateConfirm
			invoice={invoice}
			setShowExchangeRateConfirmation={setShowExchangeRateConfirmation}
			showExchangeRateConfirmation={showExchangeRateConfirmation}
			setShow={setShowReview}
		/>
	) : (
		<Modal show={showReview} onClose={() => setShowReview(false)} closeOnOuterClick={false}>
			<Modal.Header title="MARK AS REVIEWED" />
			<Modal.Body>
				<div className={styles.form}>
					<Confirmation value={value} setValue={setValue} />
				</div>
			</Modal.Body>
			<Modal.Footer className={styles.btn_div}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShowReview(false)}
					disabled={loading}
				>
					Close
				</Button>
				<Button
					onClick={handleUpdate}
					disabled={loading || !value}
				>
					Reviewed
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ReviewServices;
