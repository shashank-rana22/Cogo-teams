import {
	CheckboxController,
	UploadController,
	InputController,
	SelectController,
	TextAreaController,
	ChipsController,
	MultiselectController,
	DateRangePickerController,
} from '@cogoport/forms';

import styles from './styles.module.css';

function FormElement({ name, field, control, options, errors, value = false }) {
	const finalFields = {
		...field,
	};
	const required = ['title', 'validity', 'hot_duration', 'announcement_type', 'audience_ids'];

	return (
		<div className={styles.container}>
			{finalFields.type !== 'checkbox' && (
				<div className={styles.label}>
					{finalFields.label}
					{' '}
					{required.includes(name) && <sup className={styles.sup}>*</sup>}
				</div>
			)}
			<div>
				{finalFields.type === 'chips' && (
					<ChipsController control={control} {...finalFields} />
				)}
				{finalFields.type === 'checkbox' && (
					<CheckboxController control={control} {...finalFields} checked={value} />
				)}

				{finalFields.type === 'select' && (
					<SelectController control={control} {...finalFields} options={options} />
				)}
				{finalFields.type === 'multi-select' && (
					<MultiselectController control={control} {...finalFields} options={options} />
				)}

				{finalFields.type === 'text' && (
					<InputController control={control} {...finalFields} />
				)}

				{finalFields.type === 'textarea' && (
					<TextAreaController control={control} {...finalFields} />
				)}
				{finalFields.type === 'datepicker' && (
					<DateRangePickerController control={control} {...finalFields} showTimeSelect />
				)}
				{finalFields.type === 'upload' && (
					<UploadController
						multiple
						name={name}
						key={name}
						control={control}
						accept={finalFields?.accept}
					/>
				)}
			</div>
			{errors[name] && (
				<div className={styles.error_message}>{`${finalFields?.label} is ${errors[name]?.message}`}</div>
			)}
		</div>
	);
}

export default FormElement;
