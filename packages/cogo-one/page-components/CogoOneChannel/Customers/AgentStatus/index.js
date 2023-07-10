import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import useAgentWorkPrefernce from '../../../../hooks/useAgentWorkPrefernce';
import useCreateUserInactiveStatus from '../../../../hooks/useCreateUserInactiveStatus';
import InactiveModal from '../InactiveModal';

function AgentStatus() {
	const [openInactiveModal, setOpenInactiveModal] = useState(false);

	const {
		agentStatus = {},
		fetchworkPrefernce = () => {},
	} = useAgentWorkPrefernce();

	const {
		loading: statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce,
		setOpenModal: setOpenInactiveModal,
	});

	const { status = '' } = agentStatus || {};

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
