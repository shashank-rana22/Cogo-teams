import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import CallHistory from '../../../../../common/CallHistory';

import styles from './styles.module.css';

function ReceiveDiv({ eachList = {} }) {
	const {
		created_at,
		user_data = {},
		user_id = '',
		user_number = '',
		start_time_of_call = '',
		end_time_of_call,
		dtmf_inputs = [],
		channel_type = '',
	} = eachList || {};

	const date = 	created_at ? formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	}) : '';

	let name = user_number;
	if (user_id) {
		name = user_data?.name;
	}

	return (
		<div className={styles.container}>
			<div className={styles.name}>
				{name}
				<span className={styles.time_stamp}>{date}</span>
			</div>

			<div className={styles.receive_message_container}>
				<CallHistory
					type="user"
					endTimeOfCall={end_time_of_call}
					startTimeOfCall={start_time_of_call}
					dtmfInputs={dtmf_inputs}
					channelType={channel_type}
				/>
			</div>
		</div>
	);
}
export default ReceiveDiv;
