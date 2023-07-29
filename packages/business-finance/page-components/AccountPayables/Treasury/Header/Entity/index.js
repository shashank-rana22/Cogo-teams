import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';

import styles from './styles.module.css';

function Entity({ entityCode = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Entity
				{' '}
				{entityCode}
			</div>

			{ENTITY_MAPPING[entityCode].icon()}
		</div>
	);
}
export default Entity;
