import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import CallHistory from '../CallHistory';

import styles from './styles.module.css';

function SentDiv({ eachList = {} }) {
	const {
		created_at,
		agent_data = {},
		start_time_of_call = '',
		end_time_of_call,
		channel_type,
	} = eachList || {};

	const date = created_at ?	formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	}) : '';

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
					<CallHistory
						type="agent"
						end_time_of_call={end_time_of_call}
						start_time_of_call={start_time_of_call}
						channelType={channel_type}
					/>
				</div>
			</div>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/admin_icon.svg"
				alt="KAM"
			/>
		</div>
	);
}
export default SentDiv;
