import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function PortPair({ portPair, handlePortChange = () => {} }) {
	const originCode = portPair?.origin_code;
	const originName = portPair?.origin?.split('(')[0];
	const originCountry = portPair?.origin?.split(' ')?.slice(-1);
	const destinationCode = portPair?.destination_code;
	const destinationName = portPair?.destination?.split('(')[0];
	const destinationCountry = portPair?.destination?.split(' ')?.slice(-1);
	return (
		<div
			role="presentation"
			onClick={() => handlePortChange(portPair)}
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
