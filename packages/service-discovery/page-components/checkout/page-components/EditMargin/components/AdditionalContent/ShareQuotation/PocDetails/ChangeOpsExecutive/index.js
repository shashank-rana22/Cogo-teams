import { Modal } from '@cogoport/components';
import { useState, useEffect } from 'react';

import AddExecutive from './components/AddExecutive';
import ChangeExecutive from './components/ChangeExecutive';

const MOBILE_MAX_WIDTH = 768;

function ChangeOpsExecutive({
	show = false,
	onClose = () => {},
	data = {},
	user_id,
	onUpdate,
	loading = false,
	branch_id = '',
	isChannelPartner,
	setShowEditContact,
}) {
	const [addExecutive, setAddExecutive] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (window.innerWidth < MOBILE_MAX_WIDTH) {
			setIsMobile(true);
		}

		function handleResize() {
			setIsMobile(window.innerWidth < MOBILE_MAX_WIDTH);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<Modal
			show={show}
			size={isMobile ? 'fullscreen' : 'md'}
			placement="center"
			style={{ width: !isMobile ? '500px' : 'unset' }}
			closeOnOuterClick={false}
			onClose={onClose}
		>
			<Modal.Header title="CHANGE OPERATIONS EXECUTIVE" />

			{addExecutive ? (
				<AddExecutive
					setAddExecutive={setAddExecutive}
					organization_id={user_id}
					branch_id={branch_id}
					onUpdate={onUpdate}
				/>
			) : (
				<ChangeExecutive
					setAddExecutive={setAddExecutive}
					loading={loading}
					onUpdate={onUpdate}
					user_id={user_id}
					branch_id={branch_id}
					isChannelPartner={isChannelPartner}
					data={data}
					setShowEditContact={setShowEditContact}
				/>
			)}
		</Modal>
	);
}

export default ChangeOpsExecutive;
