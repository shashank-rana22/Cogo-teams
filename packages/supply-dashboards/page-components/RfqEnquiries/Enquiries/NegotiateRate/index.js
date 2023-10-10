import { useState } from 'react';

import Service from './Service';
import styles from './styles.module.css';

const SINGLE_PORT_SERVICES = ['fcl_freight_local', 'lcl_freight_local'];

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
					item?.service === 'subsidiary' && SINGLE_PORT_SERVICES.includes(selectedCard?.search_type) ? null
						: (
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
						)

				))}
			</div>
		</div>
	);
}
export default NegotiateRate;
