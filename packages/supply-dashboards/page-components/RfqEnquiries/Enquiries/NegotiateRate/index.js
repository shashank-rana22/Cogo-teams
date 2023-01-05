import { useState } from 'react';

import Service from './Service';
import styles from './styles.module.css';

function NegotiateRate({ selectedCard }) {
	const service = selectedCard?.detail?.spot_negotiations.map((card) => card);
	const [activeService, setActiveService] = useState(
		null,
	);

	return (
		<div>
			<div>Add Rates</div>
			<div className={styles.service}>
				{(service || []).map((item) => (
					<Service
						selectedCard={selectedCard}
						service={item}
						activeService={activeService}
						setActiveService={setActiveService}
					/>

				))}
			</div>
		</div>
	);
}
export default NegotiateRate;
