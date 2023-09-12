import { Button, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function AdditionalTnc({ detail = {}, updateCheckout = () => {}, updateLoading = false }) {
	const [value, setValue] = useState(
		'Rates are per actuals from Shipping Lines, they might be subject to change before shipment confirmation',
	);

	const handleSubmit = () => {
		updateCheckout({
			values: { id: detail?.id, terms_and_conditions: [value] },
		});
	};

	useEffect(() => {
		if (
			Array.isArray(detail?.terms_and_conditions)
			&& !isEmpty(detail?.terms_and_conditions)
		) {
			setValue(detail?.terms_and_conditions[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}, [detail]);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.textarea_label}>
					Additional Terms & Conditions
					{updateLoading && (
						<div className={styles.text}>
							Updating...
						</div>
					)}
				</div>

				<Button
					disabled={updateLoading}
					onClick={handleSubmit}
					themeType="secondary"
				>
					{updateLoading
						? 'Freezing ...'
						: 'Freeze Terms & Conditions'}
				</Button>
			</div>

			<Textarea
				placeholder="Enter your extra terms and conditions here"
				rows={4}
				onChange={setValue}
				value={value}
			/>
		</div>
	);
}

export default AdditionalTnc;
