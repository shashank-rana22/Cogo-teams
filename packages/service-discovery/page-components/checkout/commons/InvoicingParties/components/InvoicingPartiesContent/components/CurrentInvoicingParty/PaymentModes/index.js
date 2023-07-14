import { Chips } from '@cogoport/components';

import styles from './styles.module.css';

function PaymentModes({ editMode = false, paymentModes = {}, payment_mode_details = {} }) {
	return paymentModes.map((item) => {
		const { label, style, ...restProps } = item;

		console.log('item', item);

		return (
			<div style={style} key={label}>
				<div className={styles.label}>{label}</div>
				<Chips {...restProps} />
			</div>
		);
	});
}

export default PaymentModes;
