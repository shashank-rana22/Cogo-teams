import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useCreateShipmentAirCSRSheet from '../../../../../../../hooks/useCreateShipmentAirCSRSheet';

import styles from './styles.module.css';

function ConfirmModal({
	showConfirm = {},
	setShowConfirm = () => {},
	setSheetData = () => {},
	handleSubmit = () => {},
	handleCreateProforma = () => {},
	loading = false,
	updateLoading = false,
	irnGenerated = false,
	mainServicesData = {},
}) {
	const { createShipmentAirCSRSheet, csrCreateLoading = false } = useCreateShipmentAirCSRSheet({
		mainServicesData,
		setSheetData,
	});

	useEffect(() => {
		createShipmentAirCSRSheet(showConfirm);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal
			show={!isEmpty(showConfirm)}
			onClose={() => setShowConfirm({})}
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
						onClick={() => { setShowConfirm({}); }}
						disabled={updateLoading}
					>
						Cancel
					</Button>
				</div>
				<div className={styles.button_head}>
					<Button
						onClick={handleSubmit(handleCreateProforma)}
						disabled={loading || updateLoading || !irnGenerated || csrCreateLoading}
					>
						Confirm
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default ConfirmModal;
