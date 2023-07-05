import { Modal, Button } from '@cogoport/components';
import { useEffect } from 'react';

import useGetRfqRateCards from '../../../../hooks/useGetRfqRateCards';
import useUpdateRfqState from '../../../../hooks/useUpdateRfqState';

import styles from './styles.module.css';

function ToApproveModal({ show, setShow = () => {}, rfq_id = '', cardStateCount = {}, getRfqsForApproval }) {
	const { getRfqsRateCards } = useGetRfqRateCards({ rfq_id, state: 'modified_and_sent' });

	const { modified = '', total = '' } = cardStateCount;

	const { updateRfqState, loading } = useUpdateRfqState();

	const approve_rfq = async () => {
		await updateRfqState({ rfq_id, setShow });
		await getRfqsForApproval();
	};
	useEffect(() => {
		getRfqsRateCards();
	}, [getRfqsRateCards]);

	if (!show) {
		return null;
	}
	return (
		<Modal
			size="md"
			show={show}
			onClose={() => setShow(false)}
			className={styles.modal_container}
		>
			<Modal.Header title="Approve RFQ?" />
			<Modal.Body className={styles.modal_body}>
				<div>
					Are you sure you want to approve this RFQ?
				</div>
				<div className={styles.margin_value}>
					Margin Modified in
					{' '}

					{modified}
					/
					{total}
					{' '}
					ports?
				</div>

			</Modal.Body>

			<Modal.Footer>
				<div className={styles.buttons_container}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setShow(false)}
						disabled={loading}
					>
						No
					</Button>
					<Button size="md" themeType="accent" onClick={approve_rfq} loading={false}>
						Yes
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default ToApproveModal;
