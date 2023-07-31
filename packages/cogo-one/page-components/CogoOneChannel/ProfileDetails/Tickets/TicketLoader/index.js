import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const TICKET_LOADER_COUNT = 3;
const TICKET_LOADER = [...Array(TICKET_LOADER_COUNT).keys()];

function TicketLoader() {
	return (
		(TICKET_LOADER || []).map((item) => (
			<div key={item} className={styles.container}>
				<div className={styles.header}>
					<Placeholder width="50%" height="20px" />
					<Placeholder width="20%" height="20px" />
				</div>
				<Placeholder width="100%" height="30px" margin="10px 3px" />
				<Placeholder width="100%" height="100px" margin="0 3px" />
			</div>
		))
	);
}

export default TicketLoader;
