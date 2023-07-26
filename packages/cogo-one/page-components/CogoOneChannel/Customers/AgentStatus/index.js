import { Toggle } from '@cogoport/components';

import InactiveModal from '../InactiveModal';

function AgentStatus({
	agentStatus = {},
	setOpenInactiveModal = () => {},
	openInactiveModal = false,
	updateUserStatus = () => {},
	statusLoading = false,
	fetchworkPrefernce = () => {},
}) {
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
