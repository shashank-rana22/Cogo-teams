import { Button } from '@cogoport/components';

import PortPair from './PortPair';
import styles from './styles.module.css';

function Card({ setShowDetail }) {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div>Contract ID #2322</div>
					<div className={styles.trade}>
						Export
					</div>
				</div>
				<div className={styles.details}>
					<div>No. of Containers : 150</div>
					<div>Request Date : 10 June  2022</div>
					<div>Validity : 30 Days</div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.port_pair}>
					<PortPair />
					<div className={styles.extra}>
						<div>+3</div>
						<div>more</div>
					</div>
				</div>
				<Button
					style={{ marginBottom: '10px' }}
					size="md"
					onClick={() => { setShowDetail({}); }}
					themeType="admin"
				>
					View
				</Button>
			</div>
		</div>
	);
}

export default Card;
