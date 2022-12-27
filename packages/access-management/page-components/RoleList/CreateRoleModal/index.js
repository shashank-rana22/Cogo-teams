import { useSelector } from '@cogo/store';
import { Modal } from '@cogoport/front/components';
import React from 'react';

import CreateRole from './CreateRole';

function CreateRoleModal({
	showCreateRoleModal = false,
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) {
	const { isMobile } = useSelector(({ general }) => general?.isMobile);
	if (!showCreateRoleModal) return null;

	return (
		<Modal
			show={showCreateRoleModal}
			position="basic"
			onClose={() => onChangeShowCreateRoleModal(false)}
			fullscreen={isMobile}
			onOuterClick={() => {}}
			closable={false}
			styles={!isMobile ? { dialog: { overflow: 'visible' } } : {}}
		>
			<CreateRole
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				redirect={redirect}
			/>
		</Modal>
	);
}

export default CreateRoleModal;
