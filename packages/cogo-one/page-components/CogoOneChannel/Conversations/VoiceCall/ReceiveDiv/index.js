/* eslint-disable max-len */
import { format } from '@cogoport/utils';

import CallHistory from '../CallHistory';

import styles from './styles.module.css';

function ReceiveDiv({ eachList = {} }) {
	const {
		created_at,
		user_data = null,
		user_id = null,
		user_number = '',
		start_time_of_call = '',
		end_time_of_call,
		dtmf_inputs = [],
	} = eachList || {};
	const date = format(new Date(created_at), 'dd MMM YYYY');
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
				<CallHistory type="user" end_time_of_call={end_time_of_call} start_time_of_call={start_time_of_call} dtmf_inputs={dtmf_inputs} />
			</div>
		</div>
	);
}
export default ReceiveDiv;
