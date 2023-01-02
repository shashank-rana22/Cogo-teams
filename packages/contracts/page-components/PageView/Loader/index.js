import { Placeholder } from '@cogoport/components';

import PortPair from './PortPair';
import styles from './styles.module.css';

function Card() {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div><Placeholder /></div>
					<div className={styles.trade}>
						<Placeholder />
					</div>
				</div>
				<div className={styles.details}>
					<div><Placeholder /></div>
					<div><Placeholder /></div>
					<div><Placeholder /></div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.port_pair}>
					{[...Array(3)].map(() => <PortPair />)}
				</div>
				<div className={styles.last}>
					<div className={styles.extra}>
						<div><Placeholder /></div>
						<div><Placeholder /></div>
					</div>
					<Placeholder />
				</div>
			</div>
		</div>
	);
}

export default Card;
