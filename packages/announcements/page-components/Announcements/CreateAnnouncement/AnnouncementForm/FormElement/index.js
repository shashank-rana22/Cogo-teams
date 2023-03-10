/* eslint-disable react-hooks/exhaustive-deps */
import {
	CheckboxController,
	UploadController,
	InputController,
	SelectController,
	TextAreaController,
	ChipsController,
	LocationSelectController,
	MultiselectController,
	DatepickerController,
} from '@cogoport/forms';

import styles from './styles.module.css';

// import ErrorMessage from '@/temp/components/error-message';

function FormElement({ name, field, control, options, errors }) {
	const finalFields = {
		...field,
		// options: renderOptions(),
	};

	return (
		<div className={styles.container}>
			{finalFields.type !== 'checkbox' && (
				<div className={styles.label}>{finalFields.label}</div>
			)}
			<div>
				{finalFields.type === 'chips' && (
					<ChipsController control={control} {...finalFields} />
				)}
				{finalFields.type === 'checkbox' && (
					<CheckboxController control={control} {...finalFields} />
				)}

				{finalFields.type === 'location-select' && (
					<LocationSelectController control={control} {...finalFields} />
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
					<DatepickerController control={control} {...finalFields} showTimeSelect />
				)}
				{finalFields.type === 'upload' && (
					<UploadController multiple name={name} key={name} control={control} accept={finalFields?.accept} />
				)}
			</div>
			{errors[name] && (
				<div className={styles.error_message}>{`${finalFields?.label} is ${errors[name]?.message}`}</div>
			)}
		</div>
	);
}

export default FormElement;
