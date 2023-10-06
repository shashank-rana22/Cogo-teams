import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import getService from '../../../../../utils/getService';

import styles from './styles.module.css';

const SERVICE_LABEL_MAPPING = {
	fcl_freight       : 'FCL',
	lcl_freight       : 'LCL',
	air_freight       : 'AIR',
	fcl_freight_local : 'FCL Local',
	lcl_freight_local : 'LCL Local',
};

const SINGLE_PORT_SERVICES = ['fcl_freight_local', 'lcl_freight_local'];

const ZERO = 0; const
	MINUS_ONE = -1;

function PortPair({ portPair, fromDetails }) {
	console.log('portpair', portPair);
	const originCode = portPair?.origin_code;
	const originName = portPair?.origin?.split('(')[ZERO];
	const originCountry = portPair?.origin?.split(' ')?.slice(MINUS_ONE);
	const destinationCode = portPair?.destination_code;
	const destinationName = portPair?.destination?.split('(')[ZERO];
	const destinationCountry = portPair?.destination?.split(' ')?.slice(MINUS_ONE);
	const singlePortCode = portPair?.single_port_code;
	const singlePortName = portPair?.single_port?.split('(')[ZERO];
	const singlePortCountry = portPair?.single_port?.split(' ')?.slice(MINUS_ONE);
	const Element = getService({ portPair });

	const isLocals = SINGLE_PORT_SERVICES.includes(portPair?.service_type);

	return (
		<div className={styles.container}>
			{fromDetails ? null : (
				<div className={styles.service}>
					<Element width={24} height={24} style={{ color: '#436DF4' }} />
					{SERVICE_LABEL_MAPPING[portPair?.service_type]}
				</div>
			)}
			<div className={styles.upper_body}>
				{isLocals ? (
					<div>
						<div className={styles.code}>{`(${singlePortCode})`}</div>
						<div className={styles.name}>
							<Tooltip content={singlePortName}>
								<div className={styles.subname}>{`${singlePortName}`}</div>
							</Tooltip>
							<div className={styles.country}>{`,${singlePortCountry}`}</div>
						</div>
					</div>
				) : (
					<>
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
					</>
				)}
			</div>
		</div>
	);
}

export default PortPair;
