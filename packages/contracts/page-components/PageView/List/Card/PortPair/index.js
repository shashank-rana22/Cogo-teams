import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function PortPair({ portPair }) {
	const originCode = portPair?.origin_code;
	const originName = portPair?.origin?.split('(')[0];
	const originCountry = portPair?.origin?.split(' ')?.slice(-1);
	const destinationCode = portPair?.destination_code;
	const destinationName = portPair?.destination?.split('(')[0];
	const destinationCountry = portPair?.destination?.split(' ')?.slice(-1);
	return (
		<div className={styles.upper_body}>
			<div>
				<div className={styles.code}>{`(${originCode})`}</div>
				<div className={styles.name}>
					<Tooltip content={originName}>
						<div className={styles.subname}>{`${originName}`}</div>
					</Tooltip>
					<div className={styles.country}>{`,${originCountry}`}</div>
				</div>
			</div>
			<div>
				<IcMPortArrow />
			</div>
			<div>
				<div className={styles.code}>{`(${destinationCode})`}</div>

				<div className={styles.name}>
					<Tooltip content={destinationName}>
						<div className={styles.subname}>{`${destinationName}`}</div>
					</Tooltip>
					<div className={styles.country}>{`,${destinationCountry}`}</div>
				</div>
			</div>
		</div>
	);
}

export default PortPair;
