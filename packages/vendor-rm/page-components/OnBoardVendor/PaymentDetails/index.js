import { getElementController } from '../../../utils/get-element-controller';

import useVendorBankDetail from './hooks/useVendorBankDetail';
import styles from './styles.module.css';

function PaymentDetails() {
	const { controls, control, errors } = useVendorBankDetail();

	return (
		<div className={styles.form_container}>
			{controls.map((controlItem) => {
				const el = { ...controlItem };

				const { span } = el;

				const Element = getElementController(el.type);

				if (!Element) return null;

				return (
					<div
						className={styles.form_group}
						style={{ display: 'flex', flexDirection: 'column', flexBasis: span }}
					>
						<div className={styles.form_label}>{el.label}</div>
						<div>
							<Element
								{...el}
								key={el.name}
								control={control}

							/>
							<div className={styles.error_message}>
								{errors?.[el.name]?.message}
							</div>
						</div>
					</div>
				);
			})}
		</div>

	);
}

export default PaymentDetails;
