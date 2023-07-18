import { Select } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export const DOCUMENT_HANDLING_FIELDS = [
	'Document Category',
	'Document Type',
	'Document Delivery Preference',
];

function PaymentModes({ editMode = false, paymentModes = [] }) {
	return paymentModes.map((item) => {
		const { label, style, ...restProps } = item;

		const { options = [], value = '' } = restProps;

		if (isEmpty(options) && DOCUMENT_HANDLING_FIELDS.includes(label)) {
			return null;
		}

		console.log('restProps', value);

		return (
			<div style={style} className={styles.container} key={label}>
				<div className={styles.label}>{label}</div>

				{!editMode ? <div className={styles.value}>{startCase(value || '--')}</div> : (
					<Select
						key={value}
						{...restProps}
					/>
				) }
			</div>
		);
	});
}

export default PaymentModes;
