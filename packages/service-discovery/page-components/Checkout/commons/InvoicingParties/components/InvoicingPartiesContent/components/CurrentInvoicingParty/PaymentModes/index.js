import { Select } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import DotLoader from '../../../../../../LoadingState/DotLoader';

import styles from './styles.module.css';

export const DOCUMENT_HANDLING_FIELDS = [
	'Document Category',
	'Document Type',
	'Document Delivery Preference',
];

function PaymentModeComponent({
	paymentModesLoading = false,
	editMode = false,
	valueToShow = '',
	value = '',
	restProps = {},
}) {
	if (paymentModesLoading) {
		return <div style={{ marginLeft: '12px' }}><DotLoader size="sm" /></div>;
	}

	if (!editMode) {
		return <div className={styles.value}>{startCase(valueToShow || '--')}</div>;
	}

	return <Select size="sm" key={value} {...restProps} />;
}

function PaymentModes({
	editMode = false,
	paymentModes = [],
	paymentModeValues = {},
	paymentModesLoading = false,
}) {
	return paymentModes.map((item) => {
		const { label, style, name, ...restProps } = item;

		const { options = [], value = '' } = restProps;

		if (isEmpty(options) && DOCUMENT_HANDLING_FIELDS.includes(label)) {
			return null;
		}

		const valueToShow = paymentModeValues[name] || '';

		if (!editMode && DOCUMENT_HANDLING_FIELDS.includes(label) && !valueToShow) {
			return null;
		}

		return (
			<div style={style} className={styles.container} key={label}>
				<div className={styles.label}>{label}</div>

				<PaymentModeComponent
					valueToShow={valueToShow}
					value={value}
					editMode={editMode}
					paymentModesLoading={paymentModesLoading}
					restProps={restProps}
				/>
			</div>
		);
	});
}

export default PaymentModes;
