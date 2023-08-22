import { isEmpty } from '@cogoport/utils';

import PortPairData from './PortPairData';
import styles from './styles.module.css';

function MachineIntelligence({ eachItem = {} }) {
	const { machine_intelligence_data } = eachItem || {};

	const { mode_percentages, port_pair_data } = machine_intelligence_data || {};
	console.log('mode_percentages', mode_percentages);

	return (
		<div className={styles.container}>
			<div className={styles.port_pair_data}>
				{isEmpty(port_pair_data)
					? (
						<div
							className={styles.not_found_text}
						>
							No port pair data found
						</div>
					) : <PortPairData portPairCardData={port_pair_data} /> }
			</div>
		</div>
	);
}
export default MachineIntelligence;
