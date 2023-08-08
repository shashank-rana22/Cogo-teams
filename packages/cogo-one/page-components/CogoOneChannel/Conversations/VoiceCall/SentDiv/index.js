import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';

import CallHistory from '../../../../../common/CallHistory';

import styles from './styles.module.css';

function SentDiv({ eachList = {} }) {
	const {
		created_at,
		agent_data = {},
		start_time_of_call = '',
		end_time_of_call,
		channel_type,
	} = eachList || {};

	const date = created_at ? formatDate({
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
						endTimeOfCall={end_time_of_call}
						startTimeOfCall={start_time_of_call}
						channelType={channel_type}
					/>
				</div>
			</div>
			<Image
				src={GLOBAL_CONSTANTS.image_url.admin_logo_svg}
				alt="KAM"
				width={25}
				height={25}
			/>
		</div>
	);
}
export default SentDiv;
