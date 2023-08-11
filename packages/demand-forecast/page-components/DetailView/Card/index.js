import { Button } from '@cogoport/components';
import { useState } from 'react';

import EmailPreview from '../EmailPreview';

import styles from './styles.module.css';

const NUMBER_FIXED_TO_DECIMAL = 3;

function Card({ card = {}, origin_location_id = '', destination_location_id = '' }) {
	const { capability, rates_added, service_provider = {}, winning_profitability } = card;

	const [isEmail, setIsEmail] = useState(false);

	const sendEmail = () => {
		setIsEmail(!isEmail);
	};

	return (
		<>
			<div className={styles.row}>
				<div className={styles.supplier_name}>{service_provider?.business_name}</div>
				<div
					className={styles.winning_profitability}
				>
					{winning_profitability.toFixed(NUMBER_FIXED_TO_DECIMAL)}
				</div>
				<div className={styles.capability}>{capability}</div>
				<div className={styles.rates_added}>{rates_added}</div>
				<div className={styles.ask_for_rates}>
					<Button
						size="md"
						themeType="secondary"
						onClick={sendEmail}
					>
						Ask For rates
					</Button>
				</div>

			</div>
			{isEmail && (
				<EmailPreview
					setIsEmail={setIsEmail}
					isEmail={isEmail}
					service_provider={service_provider}
					origin_location_id={origin_location_id}
					destination_location_id={destination_location_id}
				/>
			)}
		</>
	);
}

export default Card;
