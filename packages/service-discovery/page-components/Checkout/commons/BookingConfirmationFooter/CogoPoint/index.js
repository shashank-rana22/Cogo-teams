import { IcCCogoCoin } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CogoPoint({ cogopoint = {} }) {
	if (!cogopoint.cogopoints) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.cogo_icon}>
				<IcCCogoCoin id="cogo-coin-origin" height={16} width={16} />
			</div>
			<div className={styles.points}>{cogopoint.cogopoints}</div>
			<div className={styles.text}>CogoPoints will be added</div>
		</div>
	);
}

export default CogoPoint;
