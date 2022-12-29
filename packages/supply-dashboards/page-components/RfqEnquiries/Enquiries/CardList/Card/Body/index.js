import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Body({ item }) {
	const originCode = item?.origin_port?.port_code;
	const originName = item?.origin_port?.name.split('(')[0].replace(/\s+/g, ' ');
	const originCountry = item?.origin_country?.name;
	const destinationCode = item?.destination_port?.port_code;
	const destinationName = item?.destination_port?.name.split('(')[0].replace(/\s+/g, ' ');
	const destinationCountry = item?.destination_country?.name;
	return (
		<div className={styles.body}>
			<div className={styles.upper_body}>
				<div>
					<div className={styles.code}>{`(${originCode})`}</div>
					<div className={styles.name}>
						<div>{`${originName},`}</div>
						<div className={styles.country}>{`${originCountry}`}</div>
					</div>
				</div>
				<div>
					<IcMPortArrow />
				</div>
				<div>
					<div className={styles.code}>{`(${destinationCode})`}</div>

					<div className={styles.name}>
						<div>{`${destinationName},`}</div>
						<div className={styles.country}>{`${destinationCountry}`}</div>
					</div>
				</div>
			</div>
			<div>
				{`${item?.containers_count} Container x ${item?.container_size} x ${startCase(item?.container_type)}, 
                ${startCase(item?.commodity)}`}
			</div>

		</div>

	);
}
export default Body;
