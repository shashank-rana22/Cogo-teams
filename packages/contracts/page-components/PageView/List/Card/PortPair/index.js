import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function PortPair({ portPair, handlePortChange = () => {} }) {
	const originCode = portPair?.origin_port?.port_code;
	const originName = portPair?.origin_port?.name.split('(')[0];
	const originCountry = portPair?.origin_port?.display_name.split(' ').slice(-1);
	const destinationCode = portPair?.destination_port?.port_code;
	const destinationName = portPair?.destination_port?.name.split('(')[0];
	const destinationCountry = portPair?.destination_port?.display_name.split(' ').slice(-1);
	const uniqueId = `${portPair?.origin_port_id} ${portPair?.destination_port_id}`;
	return (
		<div
			role="presentation"
			onClick={() => handlePortChange({ ...portPair, uniqueId })}
			className={styles.container}
		>
			<div>
				<div>
					{`${originName} (${originCode})`}
				</div>
				<div>
					{originCountry}
				</div>

			</div>
			<IcMPortArrow />
			<div>
				<div>
					{`${destinationName} (${destinationCode})`}
				</div>
				<div>
					{destinationCountry}
				</div>
			</div>
		</div>
	);
}

export default PortPair;
