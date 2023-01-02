import { Modal } from '@cogoport/components';
import React, { useState } from 'react';

import Edit from './edit';
import PencilSvg from './edit-icon.svg';
import { EditRoleButton } from './styles';

function EditRoleModal({ roleData, getRole }) {
	const [show, setShow] = useState(false);

	const onClick = () => {
		setShow(true);
	};

	const onOuterClick = () => {
		setShow(false);
	};
	return (
		<div>
			<EditRoleButton onClick={() => onClick()}>
				<div>
					<PencilSvg size={1.2} marginRight={1.2} />
				</div>
				Edit
				{' '}
			</EditRoleButton>

			<Modal
				show={show}
				position="basic"
				onClose={() => setShow(false)}
				onOuterClick={onOuterClick}
				width={!isMobile ? 700 : 'auto'}
				fullscreen={isMobile}
				styles={!isMobile ? { dialog: { overflow: 'visible' } } : {}}
			>
				<Edit
					roleData={roleData}
					onClose={() => setShow(false)}
					getRole={getRole}
				/>
			</Modal>
		</div>
	);
}

export default EditRoleModal;
