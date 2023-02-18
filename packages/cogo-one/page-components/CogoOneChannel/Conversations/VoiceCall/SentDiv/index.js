/* eslint-disable max-len */

import { format } from '@cogoport/utils';

import CallHistory from '../CallHistory';

import styles from './styles.module.css';

function SentDiv() {
	// const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');

	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					by agent name
					,
					{/* <span className={styles.time_stamp}>{date}</span> */}
				</div>
				<div className={styles.styled_div}>
					<CallHistory type="agent" />
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
