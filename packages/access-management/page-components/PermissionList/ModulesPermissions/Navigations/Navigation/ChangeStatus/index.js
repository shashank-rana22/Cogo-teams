import React, { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/toast';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import { useSelector } from '@cogo/store';
import Modal from '@cogo/commons/components/ModalNew';
import { Container, Heading } from './styles';

const ChangeStatus = ({
	type,
	show,
	onClose,
	navigation,
	auth_role_id,
	getList,
}) => {
	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));
	const [isLoading, setIsLoading] = useState(false);
	const api =
		type === 'active'
			? '/onboard_auth_role'
			: '/update_auth_role_permission_mapping';
	const updateStatus = useRequest('post', false, scope)(api);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const payload =
				type === 'active'
					? {
							auth_role_id,
							navigation_permission_pairs: [{ navigation, permissions: [] }],
					  }
					: {
							status: type,
							navigation,
							auth_role_id,
					  };
			const res = await updateStatus.trigger({
				data: payload,
			});
			setIsLoading(false);
			if (!res.hasError) {
				toast.success('Status updated');
				getList(auth_role_id, false);
				onClose();
			}
		} catch (err) {
			setIsLoading(false);
			if (err.status !== 403) {
				showErrorsInToast(err.message);
			}
		}
	};

	const headerContent = () => (
		<div>
			<Heading>{type === 'active' ? 'Assign' : 'Un-assign'} Module </Heading>
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
			<Container>
				<h3 style={{ padding: '0px 22px' }}>
					Are you sure you want to {type === 'active' ? 'Assign' : 'Un-assign'}{' '}
					?
				</h3>
			</Container>
		</Modal>
	);
};

export default ChangeStatus;
