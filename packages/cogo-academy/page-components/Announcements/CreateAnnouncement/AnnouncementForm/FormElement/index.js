import {
	CheckboxController,
	UploadController,
	InputController,
	SelectController,
	TextAreaController,
	MultiselectController,
	DateRangePickerController,
} from '@cogoport/forms';

import styles from './styles.module.css';

const required = ['title', 'validity', 'announcement_type', 'audience_ids'];

function FormElement({ name, field, control, options, errors, value = false }) {
	const finalFields = {
		...field,
		control,
	};

	const CONTROL_MAPPING = {
		text: {
			component : InputController,
			props     : { ...finalFields },
		},
		checkbox: {
			component : CheckboxController,
			props     : { ...finalFields, checked: value },
		},
		select: {
			component : SelectController,
			props     : { ...finalFields, options },
		},
		multiselect: {
			component : MultiselectController,
			props     : { ...finalFields, options },
		},
		textarea: {
			component : TextAreaController,
			props     : { ...finalFields },
		},
		daterangepicker: {
			component : DateRangePickerController,
			props     : { ...finalFields, showTimeSelect: true },
		},
		upload: {
			component : UploadController,
			props     : { name, key: name, control, accept: field.accept, multiple: true },
		},
	};

	const { component:Element, props } = CONTROL_MAPPING[field.type];

	return (
		<div className={styles.container}>
			{finalFields.type !== 'checkbox' && (
				<div className={styles.label}>
					{finalFields.label}
					{' '}
					{required.includes(name) && <sup className={styles.sup}>*</sup>}
				</div>
			)}

			<div className={finalFields.type === 'checkbox' ? styles.checkbox : ''}>
				<Element {...props} />
			</div>

			{errors[name] && (
				<div className={styles.error_message}>{`${finalFields?.label} is ${errors[name]?.message}`}</div>
			)}
		</div>
	);
}

export default FormElement;
