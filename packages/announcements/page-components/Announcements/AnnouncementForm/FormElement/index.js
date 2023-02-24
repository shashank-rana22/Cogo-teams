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
	DateRangePickerController,
} from '@cogoport/forms';

import styles from './styles.module.css';

// import ErrorMessage from '@/temp/components/error-message';

function FormElement({ name, field, control, options }) {
	// let options = [];

	// if (
	// 	field.optionsListKey
	// 	&& field?.type === 'select'
	// ) {
	// 	options = getStaticOptions(
	// 		...field,
	// 	);
	// }
	// const { options } = useGetAsyncOptions({
	// 	...asyncFieldsPartner(),
	// 	params: {
	// 		filters: {
	// 			status       : 'active',
	// 			entity_types : ['cogoport'],
	// 		},
	// 		page_limit: 10,
	// 	},
	// });

	// const finalOptions = options?.map((o) => ({
	// 	label : `${startCase(o.business_name)}`,
	// 	value : `${o.id}`,
	// }));

	// const renderOptions = () => {
	// 	if (!field?.options) return finalOptions;
	// 	return field?.options;
	// };

	const finalFields = {
		...field,
		// options: renderOptions(),
	};

	return (
		<div className={styles.container}>
			{
				finalFields.type !== 'checkbox' && (
					<div className={styles.label}>{finalFields.label}</div>
				)
			}
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
					<DateRangePickerController control={control} {...finalFields} showTimeSelect />
				)}
				{finalFields.type === 'upload' && (
					<UploadController multiple name={name} key={name} control={control} accept={finalFields?.accept} />
				)}
			</div>
			{/* <ErrorMessage message={errors[finalFields.name]?.message} /> */}
		</div>
	);
}

export default FormElement;
