import { Tooltip } from '@cogoport/components';
import { IcMFairport, IcMFship, IcMLcl, IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const iconMapping = {
	fcl_freight : IcMFship,
	lcl_freight : IcMLcl,
	air_freight : IcMFairport,
};

const getService = ({ service_type }) => {
	const Element = iconMapping[service_type] || IcMFship;

	return Element;
};

function PortPair({ portPair, service_type }) {
	const { originPort:origin_port, destinationPort:destination_port } = portPair || {};

	const originCode = origin_port?.port_code;
	const originName = origin_port?.name;
	const originCountry = origin_port?.display_name
		?.split(' ')?.slice(-1);
	const destinationCode = destination_port?.port_code;
	const destinationName = destination_port?.name;
	const destinationCountry = destination_port?.display_name?.split(' ')?.slice(-1);
	const Element = getService({ service_type });

	return (
		<div className={styles.container}>

			<div className={styles.service}>
				<Element width={24} height={24} style={{ color: '#436DF4', marginRight: 16 }} />
				{startCase(portPair?.service_type)}
			</div>

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
