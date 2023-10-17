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

function LocationDetails({ name = '', code = '', country = '' }) {
	return (
		<div>
			<div className={styles.code}>{`(${code})`}</div>
			<div className={styles.name}>
				<Tooltip content={name}>
					<div className={styles.subname}>{`${name}`}</div>
				</Tooltip>
				<div className={styles.country}>{`,${country}`}</div>
			</div>
		</div>
	);
}

function PortPair({ portPair, fromDetails }) {
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

	const isLocalService = SINGLE_PORT_SERVICES.includes(portPair?.service_type);

	return (
		<div className={styles.container}>
			{fromDetails ? null : (
				<div className={styles.service}>
					<Element width={24} height={24} style={{ color: '#436DF4' }} />
					{SERVICE_LABEL_MAPPING[portPair?.service_type]}
				</div>
			)}
			<div className={styles.upper_body}>
				{isLocalService ? (
					<LocationDetails name={singlePortName} code={singlePortCode} country={singlePortCountry} />
				) : (
					<>

						<LocationDetails name={originName} code={originCode} country={originCountry} />
						<div>
							<IcMPortArrow />
						</div>
						<LocationDetails name={destinationName} code={destinationCode} country={destinationCountry} />
					</>
				)}
			</div>
		</div>
	);
}

export default PortPair;
