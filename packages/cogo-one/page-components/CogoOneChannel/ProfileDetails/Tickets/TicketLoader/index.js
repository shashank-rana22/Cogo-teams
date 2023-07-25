import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function TicketLoader() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Placeholder width="50%" height="20px" />
				<Placeholder width="20%" height="20px" />
			</div>
			<Placeholder width="100%" height="30px" margin="10px 3px" />
			<Placeholder width="100%" height="100px" margin="0 3px" />
		</div>
	);
}

export default TicketLoader;
