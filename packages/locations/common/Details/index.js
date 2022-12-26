import { format } from '@cogoport/utils';

import DETAILS from '../../constants/details';

import styles from './styles.module.css';

function Details({ activeCard = {} }) {
	const formatDate = (date) => format(date, 'dd MMM yy | hh:mm a');

	return (
		<div style={{ marginTop: 20 }}>
			{DETAILS.map((item) => {
				if (activeCard[item.key]) {
					return (
						<div className={styles.active_content}>
							<h4>{item.label}</h4>
							<div className={styles.description}>
								{item.type === 'date' ? formatDate(activeCard[item.key]) : activeCard[item.key]}
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

export default Details;
