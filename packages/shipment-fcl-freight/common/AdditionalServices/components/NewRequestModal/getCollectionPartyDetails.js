import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export const getCollectionPartyDetails = () => {
	const handleModifiedOptions = ({ options = [] }) => options?.map((option) => ({
		...option,
		display_name:
	<div className={styles.label_container}>
		<div className={styles.spacebetween}>
			<div>
				{
					option?.trade_party_type === 'self'
						? option?.display_name
						: `${option?.business_name} ${option?.display_name}`
				}
			</div>
			<div className={styles.verification_status}>{startCase(option?.verification_status)}</div>
		</div>
		{option?.tds_deduction_rate ? (
			<div className={styles.tds}>
				TDS Deduction Rate:
				{option?.tds_deduction_rate}
				%
			</div>
		) : null}
	</div>,
		registration_number: option?.registration_number,
	}));

	return {
		handleModifiedOptions,
	};
};
