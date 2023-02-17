/* eslint-disable max-len */
import { format } from '@cogoport/utils';

import CallHistory from '../CallHistory';

import styles from './styles.module.css';

function ReceiveDiv() {
	// const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');

	return (
		<div className={styles.container}>
			<div className={styles.name}>
				{/* {name} */}
				,
				<span className={styles.time_stamp}>
					{/* {date} */}
				</span>
			</div>

			<div className={styles.receive_message_container}>
				<CallHistory type="user" />
			</div>
		</div>
	);
}
export default ReceiveDiv;
