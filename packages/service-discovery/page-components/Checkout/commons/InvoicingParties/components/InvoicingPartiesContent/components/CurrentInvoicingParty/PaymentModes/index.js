import { Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import DotLoader from '../../../../../../../../../common/LoadingState/DotLoader';
import { CheckoutContext } from '../../../../../../../context';

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
	isFclInvoice = false,
}) {
	const { activated_on_paylater = {} } = useContext(CheckoutContext);

	const { paylater_eligibility = false } = activated_on_paylater || {};

	return paymentModes.map((item) => {
		const { label, style, name, ...restProps } = item;

		const { value = '' } = restProps;

		const valueToShow = paymentModeValues[name] || '';

		if ((!isFclInvoice || !paylater_eligibility) && DOCUMENT_HANDLING_FIELDS.includes(label)) {
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
