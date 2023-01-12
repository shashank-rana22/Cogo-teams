import { Modal, Button } from '@cogoport/components';
import React from 'react';

import useUpdateStatus from '../../../../../../hooks/useUpdateStatus';

function ChangeStatus({
	type,
	show,
	onClose,
	navigation,
	auth_role_id,
	getList,
}) {
	const { handleSubmit, loading } = useUpdateStatus({
		navigation, auth_role_id, getList, onClose, type,
	});

	const headingText = type === 'active' ? 'Assign' : 'Un-assign';

	const headerContent = (
		<span>
			{headingText}
			{' '}
			Module
			{' '}
		</span>
	);

	return (
		<Modal show={show} size="sm" onClose={onClose}>
			<Modal.Header title={headerContent} />
			<Modal.Body>
				<section>
					<h3 style={{ padding: '0px 22px' }}>
						Are you sure you want to
						{' '}
						{headingText}
						{' '}
						?
					</h3>
				</section>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					style={{ marginRight: 10 }}
					themeType="secondary"
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					size="md"
					onClick={handleSubmit}
					loading={loading}
				>
					{headingText}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeStatus;
