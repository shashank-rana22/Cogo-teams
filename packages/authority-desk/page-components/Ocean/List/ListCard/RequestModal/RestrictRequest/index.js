import React from 'react';
import { IcCError } from '@cogoport/icons-react';
import { Modal } from '@cogoport/components';
import { Content } from './styles.module.css';

const RestrictRequest = ({ requestModal, setRequestModal }) => {
	return (
		<Modal show={requestModal} onClose={() => setRequestModal(false)}>
			<div style={{ textAlign: 'center' }}>
				<IcCError width={28} height={28} />
			</div>

			<Content>
				Oops!!! You cannot request for document release as some of your
				mandatory tasks are not completed yet.
			</Content>
		</Modal>
	);
};

export default RestrictRequest;
