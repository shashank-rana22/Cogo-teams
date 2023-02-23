import { Button, Modal } from '@cogoport/components';
import { IcMLocation } from '@cogoport/icons-react';

import styles from './styles.module.css';

function AddressModal({ addressModal = {}, setAddressModal = () => {} }) {
	return (

		<>
			<Modal.Header title={(
				<div className={styles.header}>
					<IcMLocation />
					<div>Address</div>
				</div>
			)}
			/>

			<Modal.Body>
				{addressModal.addressData }
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						type="button"
						size="md"
						themeType="primary"
						onClick={() => setAddressModal(() => ({
							showModal   : false,
							addressData : '',
						}))}
						// disabled={loading}

					>
						Close
					</Button>

				</div>
			</Modal.Footer>

		</>
	);
}

export default AddressModal;
