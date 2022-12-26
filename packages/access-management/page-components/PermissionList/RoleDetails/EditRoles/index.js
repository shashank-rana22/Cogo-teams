import React, { useState } from 'react';
import Modal from '@cogoport/front/components/Modal';
import { useSelector } from '@cogo/store';
import { EditRoleButton } from './styles';
import Edit from './edit';
import PencilSvg from './edit-icon.svg';

const EditRoleModal = ({ roleData, getRole }) => {
	const [show, setShow] = useState(false);

	const isMobile = useSelector(({ general }) => general?.isMobile);

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
				Edit{' '}
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
};

export default EditRoleModal;
