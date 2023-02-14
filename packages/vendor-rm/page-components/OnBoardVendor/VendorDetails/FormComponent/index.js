import { getElementController } from '../../../../utils/get-element-controller';
import useOnBoardVendor from '../hooks/useOnBoardVendor';

import styles from './styles.module.css';

function FormComponent() {
	const {
		fields = [],
		control,
		errors,
	} =	useOnBoardVendor();
	return (
		<div className={styles.form_container}>
			{fields.map((controlItem) => {
				const el = { ...controlItem };

				const { style } = controlItem;

				const Element = getElementController(el.type);

				if (!Element) return null;

				return (
				// eslint-disable-next-line max-len
					<div className={styles.form_group} style={style}>
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

export default FormComponent;
