import { ICON_MAPPING } from '../../Constants';

import styles from './styles.module.css';

function Entity({ entityCode = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Entity
				{' '}
				{entityCode}
			</div>
			{ICON_MAPPING[entityCode]}
		</div>
	);
}
export default Entity;
