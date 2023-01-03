import { useState } from 'react';

import Service from './Service';
import styles from './styles.module.css';

function NegotiateRate({ selectedCard }) {
	const service = [];
	const [activeService, setActiveService] = useState(
		null,
	);

	if (selectedCard) {
		selectedCard?.detail?.spot_negotiations.forEach((card) => {
			service.push(card);
		});
	}

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
