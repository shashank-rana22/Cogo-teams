/* eslint-disable max-len */

import { format } from '@cogoport/utils';

import CallHistory from '../CallHistory';

import styles from './styles.module.css';

function SentDiv({ eachList = {} }) {
	const {
		created_at,
		agent_data = {},
		start_time_of_call = '',
		end_time_of_call,
	} = eachList || {};
	const date = format(new Date(created_at), 'dd MMM YYYY');

	const name = agent_data?.name;

	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					by
					{' '}
					{name}
					{' '}
					,
					<span className={styles.time_stamp}>{date}</span>
				</div>
				<div className={styles.styled_div}>
					<CallHistory type="agent" end_time_of_call={end_time_of_call} start_time_of_call={start_time_of_call} />
				</div>
			</div>
			<img
				src="https://cogoport-testing.sgp1.digitaloceanspaces.com/10118f395f681ff8ce69dc191c28d45d/XMLID_816_.svg"
				alt="KAM"
			/>
		</div>
	);
}
export default SentDiv;
