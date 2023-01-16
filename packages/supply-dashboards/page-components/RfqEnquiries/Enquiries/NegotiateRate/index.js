import { useState } from 'react';

import Service from './Service';
import styles from './styles.module.css';

function NegotiateRate({ selectedCard, refetch = () => {} }) {
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
	const [submittedEnquiry, setSubmittedEnquiry] = useState([]);

	return (
		<div className={styles.form}>
			<div className={styles.heading}>Negotiate Rates</div>
			<div className={styles.service}>
				{(service || []).map((item) => (
					<Service
						selectedCard={selectedCard}
						service={item}
						activeService={activeService}
						setActiveService={setActiveService}
						refetch={refetch}
						submittedEnquiry={submittedEnquiry}
						setSubmittedEnquiry={setSubmittedEnquiry}
					/>

				))}
			</div>
		</div>
	);
}
export default NegotiateRate;
