import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Body({ item }) {
	const originCode = (item?.origin_port || item?.origin_airport)?.port_code;
	const originName = (item?.origin_port || item?.origin_airport)?.name.split('(')[0];
	const originCountry = (item?.origin_port || item?.origin_airport)?.display_name.split(' ').slice(-1);
	const destinationCode = (item?.destination_port || item?.destination_airport)?.port_code;
	const destinationName = (item?.destination_port || item?.destination_airport)?.name.split('(')[0];
	const destinationCountry = (item?.destination_port || item?.destination_airport)?.display_name.split(' ').slice(-1);
	const commodity = item?.commodity.split('.')?.[1] !== undefined
		? `${startCase(item?.commodity.split('.')[0])}.${
			item?.commodity.split('.')[1]}`
		: startCase(item?.commodity);
	return (
		<div className={styles.body}>
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
			{item?.service_type === 'fcl_freight' && (
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
