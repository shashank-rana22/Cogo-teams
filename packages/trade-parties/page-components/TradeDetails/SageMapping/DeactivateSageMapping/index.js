import { Button, Modal } from '@cogoport/components';

import useUpdateSageOrganizationIdMapping from '../../../../hooks/useUpdateSageOrganizationIdMapping';

function DeactivateSageMapping({
	showDeactivate = null,
	setShowDeactivate = (() => { }),
	refetch = () => {},
}) {
	const refetchList = () => {
		setShowDeactivate(null);
		refetch();
	};
	const { onSubmit = () => {} } = useUpdateSageOrganizationIdMapping({ refetchList });

	const updateMapping = () => {
		const data = { id: showDeactivate, status: 'inactive' };
		onSubmit({ data });
	};

	return (
		<Modal
			show={showDeactivate}
			placement="top"
			onClose={() => setShowDeactivate(null)}
		>
			<Modal.Header title="Deactivate BPR Mapping " />
			<Modal.Body>
				Are you sure, you want to delete this Sage Mapping?
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => setShowDeactivate(null)}
					themeType="secondary"
					style={{ marginRight: 12 }}
				>
					Cancel
				</Button>

				<Button
					onClick={updateMapping}
					themeType="primary"
				>
					De-activate
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default DeactivateSageMapping;
