import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import PortPairData from './PortPairData';
import styles from './styles.module.css';

const DECIMAL_PLACES = 0;

function ModesText({ item = {} }) {
	const { name = '', percentage = '' } = item || {};

	return (
		<div className={styles.modes_container}>
			<div className={styles.mode}>{name}</div>
			<div className={styles.percentage}>
				{percentage
					? `${Number(percentage)?.toFixed(DECIMAL_PLACES)}%` : '0%'}
			</div>
		</div>
	);
}
function MachineIntelligence({ eachItem = {} }) {
	const { machine_intelligence_data } = eachItem || {};

	const { mode_percentages, port_pair_data } = machine_intelligence_data || {};

	const MODES_MAPPING = [
		{ name: 'AIR', percentage: mode_percentages?.air_mode_percentage },
		{ name: 'OCEAN', percentage: mode_percentages?.sea_mode_percentage },
		{ name: 'LAND', percentage: mode_percentages?.land_mode_percentage },
		{ name: 'OTHER', percentage: mode_percentages?.no_mode_percentage },
	];

	return (
		<div className={styles.container}>
			<div className={styles.port_pair_data}>
				{isEmpty(port_pair_data)
					? (
						<div
							className={styles.not_found_text}
						>
							<div className={styles.body}>
								<Image
									height={35}
									width={50}
									src={GLOBAL_CONSTANTS.image_url.truck_image}
									alt="no data"
								/>
								<div className={styles.no_data_found}>No data found</div>
							</div>
							<div className={styles.rect} />
						</div>
					) : <PortPairData portPairCardData={port_pair_data} /> }
			</div>
			<div className={styles.modes_percentage}>
				{MODES_MAPPING.map((item) => <ModesText key={item?.name} item={item} />)}
			</div>
		</div>
	);
}
export default MachineIntelligence;
