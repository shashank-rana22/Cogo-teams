import React from 'react';

import CargoDetails from '../../CargoDetails/RenderCargoPills';
import Icon from '../Icons/Icon';
import icons from '../Icons/icons';

import styles from './styles.module.css';

function ActiveService({ routeLeg, data = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.service_info_container}>
				<div className={styles.icon_container}>
					<Icon type={icons[routeLeg?.iconType]} />
				</div>

				<div className={styles.service_name}>{routeLeg?.display}</div>
			</div>

			<div className={styles.more_info_container}>
				<CargoDetails detail={data} />
			</div>
		</div>
	);
}

export default ActiveService;
