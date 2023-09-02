import { cl } from '@cogoport/components';

import Loader from './Loader';
import styles from './styles.module.css';

const TOTAL_FIELDS = 6;

function OrgLoaders() {
	return (
		<div className={styles.flex}>
			<div className={cl`${styles.card} ${styles.widthleft}`}>
				{[...Array(TOTAL_FIELDS).keys()].map((key) => <Loader key={key} />)}
			</div>
			<div className={cl`${styles.card} ${styles.widthright}`}>
				<Loader />
			</div>
		</div>
	);
}

export default OrgLoaders;
