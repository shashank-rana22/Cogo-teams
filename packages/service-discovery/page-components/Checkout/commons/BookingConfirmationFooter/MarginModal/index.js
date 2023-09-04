import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

function MarginModal({
	bookingConfirmationMode = '',
	showMarginModal = false, setShowMarginModal = () => {}, handleSubmit = () => {}, loading = false,
}) {
	return (
		<Modal show={showMarginModal} onClose closable={false}>

			<div className={styles.container}>

				<div className={styles.info_text}>
					{bookingConfirmationMode === 'whatsapp'
						? 'You are sending booking confirmation to whatsapp with 0 margin. Do you want to proceed?'
						: 'You are booking shipment with 0 margin do you want to proceed ?'}
				</div>

				<div className={styles.btn_container}>
					<Button
						onClick={() => setShowMarginModal(false)}
						themeType="tertiary"
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						onClick={() => handleSubmit({ source: 'margin_modal' })}
						themeType="accent"
						loading={loading}
					>
						Submit
					</Button>
				</div>
			</div>

		</Modal>
	);
}

export default MarginModal;
