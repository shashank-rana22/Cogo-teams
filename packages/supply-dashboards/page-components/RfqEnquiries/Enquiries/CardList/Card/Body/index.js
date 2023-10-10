import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const SINGLE_PORT_SERVICES = ['fcl_freight_local', 'lcl_freight_local'];

function Body({ item }) {
	const originCode = (item?.origin_port || item?.origin_airport)?.port_code;
	const originName = (item?.origin_port || item?.origin_airport)?.name.split('(')[0];
	const originCountry = (item?.origin_port || item?.origin_airport)?.display_name.split(' ').slice(-1);
	const destinationCode = (item?.destination_port || item?.destination_airport)?.port_code;
	const destinationName = (item?.destination_port || item?.destination_airport)?.name.split('(')[0];
	const destinationCountry = (item?.destination_port || item?.destination_airport)?.display_name.split(' ').slice(-1);
	const singlePortCode = (item?.port)?.port_code;
	const singlePortName = (item?.port)?.name.split('(')[0];
	const singlePortCountry = (item?.port)?.display_name.split(' ').slice(-1);
	const commodity = item?.commodity.split('.')?.[1] !== undefined
		? `${startCase(item?.commodity.split('.')[0])}.${
			item?.commodity.split('.')[1]}`
		: startCase(item?.commodity);

	const isLocals = SINGLE_PORT_SERVICES.includes(item?.service_type);

	function LocationDetails({ name, code, country }) {
		return (
			<div>
				<div className={styles.code}>{`(${code})`}</div>
				<div className={styles.name}>
					<Tooltip content={name}>
						<div className={isLocals ? styles.subnameFull : styles.subname}>{`${name}`}</div>
					</Tooltip>
					<div className={styles.country}>{`,${country}`}</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.body}>
			<div className={styles.upper_body}>
				{isLocals ? (
					<LocationDetails
						name={singlePortName}
						code={singlePortCode}
						country={singlePortCountry}
					/>
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
			{['fcl_freight_local', 'fcl_freight'].includes(item?.service_type) && (
				<div>
					{`${item?.containers_count || 1}
					 Container x ${item?.container_size} x ${startCase(item?.container_type)},
                ${commodity}`}
					<div>
						Cargo Weight per Container:
						{' '}
						{item?.cargo_weight_per_container}
					</div>
				</div>
			)}
			{['lcl_freight', 'air_freight'].includes(item?.service_type) && (
				<div>
					{`${commodity}`}
				</div>
			)}

		</div>

	);
}
export default Body;
