import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from '../styles.module.css';

function Header({ graph = {} }) {
	const graphData = Object.values(graph);

	const totalMsgCustomers = graphData.reduce(
		(acc, curr) => acc + curr.msg_customers,
		GLOBAL_CONSTANTS.zeroth_index,
	);

	const totalCallCustomers = graphData.reduce(
		(acc, curr) => acc + curr.call_customers,
		GLOBAL_CONSTANTS.zeroth_index,
	);

	return (
		<div className={styles.chart_legends_box}>
			<div className={styles.legend}>
				<div className={styles.legend_left_box}>
					<div className={cl`${styles.color_dot} ${styles.grey_color}`} />
					<div className={styles.legend_text}>On Message</div>
				</div>
				<div className={styles.users_nos}>
					{totalMsgCustomers || GLOBAL_CONSTANTS.zeroth_index}
					<span>Users</span>
				</div>
			</div>
			<div className={styles.legend}>
				<div className={styles.legend_left_box}>
					<div className={cl`${styles.color_dot} ${styles.orange_color}`} />
					<div className={styles.legend_text}>On Call</div>
				</div>
				<div className={styles.users_nos}>
					{totalCallCustomers || GLOBAL_CONSTANTS.zeroth_index}
					<span>Users</span>
				</div>
			</div>
		</div>
	);
}

export default Header;
