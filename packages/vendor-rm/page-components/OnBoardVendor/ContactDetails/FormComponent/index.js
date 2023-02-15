import FormLayout from '../../../../commons/components/FormLayout/FormLayout';
import { getElementController } from '../../../../utils/get-element-controller';
import useCreateVendorContact from '../hooks/useCreateVendorContact';

import styles from './styles.module.css';

function FormComponent() {
	const {
		fields = [],
		control,
		errors,
	} =	useCreateVendorContact();
	return (
		<div className={styles.form_container}>
			{fields.map((controlItem) => {
				const el = { ...controlItem };

				const { style } = controlItem;

				const Element = getElementController(el.type);

				if (!Element) return null;

				return (
				// eslint-disable-next-line max-len
				// <div className={styles.form_group} style={style}>
				// 	<div className={styles.form_label}>{el.label}</div>
				// 	<div>
				// 		<Element
				// 			{...el}
				// 			key={el.name}
				// 			control={control}
				// 			id={`create_vendor_contact_${el.name}_input`}
				// 		/>
				// 		<div className={styles.error_message}>
				// 			{errors?.[el.name]?.message}
				// 		</div>
				// 	</div>
				// </div>
					<FormLayout element={el} control={control} errors={errors} style={style} />
				);
			})}
		</div>
	);
}

export default FormComponent;
