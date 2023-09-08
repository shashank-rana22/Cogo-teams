import { Button, Modal } from '@cogoport/components';

import useUpdateSageOrganizationIdMapping from '../../../../hooks/useUpdateSageOrganizationIdMapping';

import styles from './styles.module.css';

function DeactivateSageMapping({
	showDeactivate = null,
	setShowDeactivate = (() => { }),
	refetch = (() => {}),
}) {
	const { onSubmit } = useUpdateSageOrganizationIdMapping();

	const updateMapping = () => {
		const data = { id: showDeactivate, status: 'inactive' };

		onSubmit(data);

		setShowDeactivate(null);
		refetch();
	};

	return (
		<Modal
			show={showDeactivate}
			placement="top"
			className={styles.container}
			onClose={() => setShowDeactivate(null)}
		>
			<div className={styles.heading}>Deactivate BPR Mapping</div>
			<div>
				Are you sure, you want to delete this Sage Mapping?
			</div>
			<div className={styles.button_container}>
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
			</div>
		</Modal>
	);
}
export default DeactivateSageMapping;
