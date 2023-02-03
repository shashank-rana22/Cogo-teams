import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getService from '../../../../../utils/getService';

import styles from './styles.module.css';

function PortPair({ portPair, fromDetails }) {
	const originCode = portPair?.origin_code;
	const originName = portPair?.origin?.split('(')[0];
	const originCountry = portPair?.origin?.split(' ')?.slice(-1);
	const destinationCode = portPair?.destination_code;
	const destinationName = portPair?.destination?.split('(')[0];
	const destinationCountry = portPair?.destination?.split(' ')?.slice(-1);
	const Element = getService({ portPair });

	return (
		<div className={styles.container}>
			{fromDetails ? null : (
				<div className={styles.service}>
					<Element width={24} height={24} style={{ color: '#436DF4' }} />
					{startCase(portPair?.service_type)}
				</div>
			)}
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
		</div>
	);
}

export default PortPair;
