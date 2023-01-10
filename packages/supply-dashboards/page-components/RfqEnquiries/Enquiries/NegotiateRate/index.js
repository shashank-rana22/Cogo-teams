import { useState } from 'react';

import Service from './Service';
import styles from './styles.module.css';

function NegotiateRate({ selectedCard }) {
	const service = [];
	selectedCard?.detail?.spot_negotiations.forEach((card) => {
		if (card?.service === selectedCard?.detail?.service_type) {
			service.push(card);
		}
	});
	selectedCard?.detail?.spot_negotiations.forEach((card) => {
		if (card?.service !== selectedCard?.detail?.service_type) {
			service.push(card);
		}
	});
	const [activeService, setActiveService] = useState(
		null,
	);

	return (
		<div>
			<div className={styles.heading}>Negotiate Rates</div>
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
