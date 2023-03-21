import { Placeholder } from '@cogoport/components';

import LoaderCardItem from './LoaderCardItem';
import styles from './styles.module.css';

function LoaderConfigurationCard() {
	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.left_header}>

					<Placeholder width="150px" height="24px" />

					<div style={{ marginRight: '28px' }} />

					<div className={styles.last_modified} />
				</div>
			</div>

			<div className={styles.cards}>
				{[1, 2, 3, 4].map((item) => <LoaderCardItem key={item.event} {...item} />)}
			</div>
		</div>
	);
}
export default LoaderConfigurationCard;
