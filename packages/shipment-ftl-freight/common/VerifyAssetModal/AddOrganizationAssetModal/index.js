import { Modal } from '@cogoport/components';

import Form from './Form';

function AddOrganizationAssetModal({
	showInternal,
	setShowInternal,
	organization_id,
	fetch,
}) {
	return (
		<Modal
			show
			onClose={() => setShowInternal(false)}
			// className={styles.custom_modal}
			closeOnOuterClick={false}
			// showCloseIcon={!loading}
			showCloseIcon

		>
			<Modal.Body>

				<Modal.Header title={(
					// <div className={styles.header}>
					<div>
						Truck List
					</div>
				)}
				/>
				<Form
					organization_id={organization_id}
					setShowInternal={setShowInternal}
					showInternal={showInternal}
					fetch={fetch}
				/>

			</Modal.Body>
		</Modal>

	);
}
export default AddOrganizationAssetModal;
