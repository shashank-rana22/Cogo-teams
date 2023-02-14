import { getElementController } from '../../../utils/get-element-controller';

import useOnBoardVendor from './hooks/useOnBoardVendor';
import styles from './styles.module.css';

function VendorDetails() {
	const {
		controls = [],
		control,
		errors,
	} =	useOnBoardVendor();

	return (
		<div className={styles.form_container}>
			{controls.map((controlItem) => {
				const el = { ...controlItem };
				const Element = getElementController(el.type);

				if (!Element) return null;

				return (
					<div className={styles.form_group}>
						<div className={styles.form_label}>{el.label}</div>
						<div>
							<Element
								{...el}
								key={el.name}
								control={control}
								id={`onboard_vendor_form_${el.name}_input`}
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

export default VendorDetails;
