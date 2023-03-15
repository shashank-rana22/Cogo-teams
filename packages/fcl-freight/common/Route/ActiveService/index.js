import React from 'react';
import CargoDetails from '../../cargo-details';
import icons from '../Icons/icons';
import Icon from '../Icons/Icon';
import styles from './styles.module.css';

const ActiveService = ({ routeLeg, data = {} }) => {
	return (
		<div className={styles.container}>
			<div className={styles.service-info-container}>
				<div className={icon-container}>
					<Icon type={icons[routeLeg?.iconType]} />
				</div>

				<div className={styles.service_name}>{routeLeg?.display}</div>
			</div>

			<div className={more-info-container}>
				<CargoDetails detail={data} />
			</div>
		</div>
	);
};

export default ActiveService;
