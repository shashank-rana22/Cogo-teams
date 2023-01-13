import { Pill } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ activePair }) {
	const keys = ['commodity', 'container_size', 'container_type', 'trade_type', 'containers_count', 'inco_term'];
	const keysToMap = { container_size: 'ft', containers_count: 'Container' };
	const originCode = activePair?.origin_code;
	const originName = activePair?.origin?.split('(')[0];
	const destinationCode = activePair?.destination_code;
	const destinationName = activePair?.destination?.split('(')[0];
	return (
		<div className={styles.heading}>
			<div className={styles.port_pair}>

				<div>
					{`${originName}(${originCode})`}
				</div>
				<IcMPortArrow />
				<div>
					{`${destinationName}(${destinationCode})`}
				</div>
			</div>

			<div className={styles.pills}>
				{keys.map((item) => (
					<div>
						{activePair[item] ? (
							<Pill
								size="md"
								color="#DFE1EF"
							>
								{Object.keys(keysToMap).includes(item)
									? `${activePair[item]} ${keysToMap[item]}`
									: activePair[item]}
							</Pill>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
}

export default Header;
