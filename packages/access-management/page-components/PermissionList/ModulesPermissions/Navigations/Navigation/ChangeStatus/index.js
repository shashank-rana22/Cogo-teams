import { Modal, Toast } from '@cogoport/components';
import showErrorsInToast from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import React from 'react';

import styles from './styles.module.css';

function ChangeStatus({
	type,
	show,
	onClose,
	navigation,
	auth_role_id,
	getList,
}) {
	const api =		type === 'active'
		? '/onboard_auth_role'
		: '/update_auth_role_permission_mapping';

	const [{ loading: isLoading }, trigger] = useRequest({
		url    : api,
		method : 'POST',
	});

	const handleSubmit = async () => {
		try {
			const payload =	type === 'active'
				? {
					auth_role_id,
					navigation_permission_pairs: [{ navigation, permissions: [] }],
				}
				: {
					status: type,
					navigation,
					auth_role_id,
				};
			const res = await trigger({
				data: payload,
			});
			if (!res.hasError) {
				Toast.success('Status updated');
				getList(auth_role_id, false);
				onClose();
			}
		} catch (err) {
			if (err.status !== 403) {
				Toast.error(showErrorsInToast(err.message));
			}
		}
	};

	const headerContent = () => (
		<div>
			<span>
				{type === 'active' ? 'Assign' : 'Un-assign'}
				{' '}
				Module
				{' '}
			</span>
		</div>
	);

	return (
		<Modal
			show={show}
			headerContent={headerContent}
			width="400px"
			submitText={type === 'active' ? 'Assign' : 'Un-assign'}
			onClose={() => {
				onClose();
			}}
			handleSubmit={handleSubmit}
			loading={isLoading}
			isScollable={false}
		>

			<Modal.Body>
				<section className={styles.container}>
					<h3 style={{ padding: '0px 22px' }}>
						Are you sure you want to
						{' '}
						{type === 'active' ? 'Assign' : 'Un-assign'}
						{' '}
						?
					</h3>
				</section>
			</Modal.Body>
		</Modal>
	);
}

export default ChangeStatus;
