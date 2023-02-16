import { getElementController } from '../../../utils/get-element-controller';

import styles from './styles.module.css';

function FormLayout({ fields = [], control = {}, errors = {} }) {
	return (
		<div className={styles.form_container}>
			{fields.map((controlItem) => {
				const element = { ...controlItem };

				const Element = getElementController(element.type);

				if (!Element) return null;

				// if (element.type === 'fieldArray') {
				// 	return (
				// 		<FieldArray
				// 			{...controlItem}
				// 			control={control}
				// 			name={controlItem.name}
				// 			error={errors?.[controlItem.name]}
				// 		/>
				// 	);
				// }

				return (
					<div className={styles.form_group} style={element?.style}>
						<div className={styles.form_label}>{element.label}</div>
						<div>
							<Element
								{...element}
								key={element.name}
								control={control}
								id={`onboard_vendor_form_${element.name}_input`}
							/>
							<div className={styles.error_message}>
								{errors?.[element.name]?.message}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default FormLayout;
