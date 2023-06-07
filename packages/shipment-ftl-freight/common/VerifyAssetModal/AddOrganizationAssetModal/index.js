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
			show={showInternal}
			size="lg"
			onClose={() => setShowInternal(false)}
			closeOnOuterClick={false}
			showCloseIcon

		>
			<Modal.Header title={(
				<div>
					Vehicle details *
				</div>
			)}
			/>
			<Modal.Body>
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
