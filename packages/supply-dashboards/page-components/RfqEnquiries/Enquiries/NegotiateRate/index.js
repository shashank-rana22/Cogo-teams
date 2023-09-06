import { useState } from 'react';

import Service from './Service';
import styles from './styles.module.css';

function NegotiateRate({ selectedCard = {}, setRevertCounts = () => {} }) {
	const SERVICE = [];
	const ZERO_VALUE = 0;
	selectedCard?.detail?.spot_negotiations.forEach((card) => {
		if (card?.service === selectedCard?.detail?.service_type) {
			SERVICE.push(card);
		}
	});
	selectedCard?.detail?.spot_negotiations.forEach((card) => {
		if (card?.service !== selectedCard?.detail?.service_type) {
			SERVICE.push(card);
		}
	});
	const [activeService, setActiveService] = useState(
		SERVICE[ZERO_VALUE],
	);
	const [submittedEnquiry, setSubmittedEnquiry] = useState([]);

	return (
		<div>
			<div className={styles.heading}>Negotiate Rates</div>
			<div className={styles.service}>
				{(SERVICE || []).map((item) => (
					<Service
						key={item?.id}
						selectedCard={selectedCard}
						service={item}
						activeService={activeService}
						setActiveService={setActiveService}
						submittedEnquiry={submittedEnquiry}
						setSubmittedEnquiry={setSubmittedEnquiry}
						setRevertCounts={setRevertCounts}
					/>

				))}
			</div>
		</div>
	);
}
export default NegotiateRate;
