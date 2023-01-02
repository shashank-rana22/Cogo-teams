import { useState, useEffect } from 'react';

import Service from './Service';
import styles from './styles.module.css';

function NegotiateRate({ selectedCard }) {
	const service = selectedCard?.detail?.services;
	const [activeService, setActiveService] = useState(
		null,
	);
	useEffect(() => {
		if (selectedCard) {
			setActiveService(selectedCard?.detail?.services[0]);
		}
	}, [selectedCard]);
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
