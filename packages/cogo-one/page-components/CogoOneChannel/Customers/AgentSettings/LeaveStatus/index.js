import { Toggle, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import useCreateUserInactiveStatus from '../../../../../hooks/useCreateUserInactiveStatus';

import styles from './styles.module.css';

const ADD_MINUTES = 30;

function LeaveStatus({
	agentStatus = {},
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	userId = '',
	firestore = {},
	preferenceLoading = false,
}) {
	const {
		loading: statusLoading = false,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce,
		agentTimeline,
		firestore,
	});

	const { status = '' } = agentStatus || {};

	const isAgentActive = status === 'active';

	const onChangeToggle = () => {
		if (statusLoading || preferenceLoading) {
			return;
		}

		if (isAgentActive) {
			const validityEnd = new Date();
			validityEnd.setMinutes(validityEnd.getMinutes() + ADD_MINUTES);

			updateUserStatus({
				status         : 'break',
				userId,
				validity_start : formatDate({
					date       : new Date(),
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
					formatType : 'dateTime',
					separator  : ' ',
				}),
				validity_end: formatDate({
					date       : new Date(validityEnd),
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
					formatType : 'dateTime',
					separator  : ' ',
				}),

			});
		} else {
			updateUserStatus({ status: 'active', userId });
		}
	};

	return (
		<div className={cl`${styles.container} ${(preferenceLoading || statusLoading) ? styles.loading_div : ''}`}>
			<Toggle
				name="online"
				size="md"
				showOnOff
				onChange={onChangeToggle}
				checked={isAgentActive}
				loading={statusLoading}
			/>
		</div>
	);
}

export default LeaveStatus;
