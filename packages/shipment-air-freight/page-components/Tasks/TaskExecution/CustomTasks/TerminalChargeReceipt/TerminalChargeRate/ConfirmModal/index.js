import { Button, Modal, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useListShipmentAirFreightConsolidatedInvoices
	from '../../../../../../../hooks/useListShipmentAirFreightConsolidatedInvoices';

import styles from './styles.module.css';

function ConfirmModal({
	showConfirm = {},
	setShowConfirm = () => {},
	type = 'terminal',
	localServiceId = '',
	mainServicesData = {},
	apiTrigger = () => {},
	updateLoading = false,
	taskId = '',
}) {
	const {
		data = {}, loading = false,
		listShipmentConsolidatedInvoices = () => {},
	} = useListShipmentAirFreightConsolidatedInvoices({
		type, localServiceId, mainServicesData,
	});

	const finalSubmit = () => {
		listShipmentConsolidatedInvoices().then(() => {
			if (isEmpty(data?.list)) {
				Toast.error('Please generate atleast one IRN');
			} else {
				const financeStatus = (data?.list || []).filter((item) => item.status === 'finance_approved');
				if (!isEmpty(financeStatus)) {
					apiTrigger(taskId);
				} else {
					Toast.error('IRN generation is pending');
				}
			}
		});
	};
	return (
		<Modal
			show={showConfirm}
			onClose={() => setShowConfirm(false)}
			className={styles.container}
		>
			<Modal.Header title="Final Confirmation !" />
			<div className={styles.text}>
				Are you sure to continue with these entries?
			</div>
			<div className={styles.button_container}>
				<div className={styles.button_head}>
					<Button
						themeType="secondary"
						onClick={() => { setShowConfirm(false); }}
						disabled={updateLoading || loading}
					>
						Cancel
					</Button>
				</div>
				<div className={styles.button_head}>
					<Button
						onClick={() => finalSubmit()}
						disabled={updateLoading || loading}
					>
						Confirm
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default ConfirmModal;
