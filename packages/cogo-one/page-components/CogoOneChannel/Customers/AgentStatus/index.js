import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import useCreateUserInactiveStatus from '../../../../hooks/useCreateUserInactiveStatus';
import InactiveModal from '../InactiveModal';

function AgentStatus({
	agentStatus = {},
	fetchworkPrefernce = () => {},
}) {
	const { status = '' } = agentStatus || {};

	const [openInactiveModal, setOpenInactiveModal] = useState(false);

	const {
		loading: statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce,
		setOpenModal: setOpenInactiveModal,
	});

	const isAgentActive = status === 'active';

	const onChangeToggle = () => {
		if (isAgentActive) {
			setOpenInactiveModal(true);
		} else {
			updateUserStatus({ status: 'active' });
		}
	};

	return (
		<>
			<Toggle
				name="online"
				size="md"
				showOnOff
				onChange={onChangeToggle}
				checked={status === 'active'}
				loading={statusLoading}
			/>

			{openInactiveModal && (
				<InactiveModal
					fetchworkPrefernce={fetchworkPrefernce}
					setOpenModal={setOpenInactiveModal}
					loading={statusLoading}
					updateUserStatus={updateUserStatus}
				/>
			)}
		</>
	);
}
export default AgentStatus;
