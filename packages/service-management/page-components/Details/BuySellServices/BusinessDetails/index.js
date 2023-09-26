import { startCase } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

const BUSINESS_DETAILS = [
	'business_name',
	'state',
	'city',
	'pincode',
	'pan_number',
	'email',
	'contact',
	'industry',
	'trade_name',
	'business_class',
	'registered_address',
	'date_of_incorporation',
	'date_of_vat_registration',
	'business_constitution',
	'date_of_registration',
	'aggregate_turnover',
	'tax_payment',
];

function BusinessDetails({ business_details = [] }) {
	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.title}>
					BUSINESS DETAILS
				</div>
				<div>(fetched via external API)</div>
			</div>
			<div className={styles.flex}>
				{BUSINESS_DETAILS.map((key, index) => (
					<div className={styles.flex_column} key={`${`${index}${uuid()}`}`}>
						<h4>{startCase(key)}</h4>
						<div>{business_details[key] || '-'}</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default BusinessDetails;
