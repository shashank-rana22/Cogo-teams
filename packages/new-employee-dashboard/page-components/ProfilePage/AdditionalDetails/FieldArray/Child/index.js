import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../getFieldController';

import styles from './styles.module.css';

const REMOVE_INDEX = 1;

const FIELD_TYPE_UPLOAD = 'fileUpload';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function Child(props) {
	const {
		controls,
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},
		watchField,
	} = props;

	const country_id = GLOBAL_CONSTANTS?.country_ids?.IN;

	const countrySpecificOptions = getCountryConstants({ country_id });

	const { options } = countrySpecificOptions || {};
	const { education_level:educationLevelOptions, disable_options } = options || {};

	const { education_level } = watchField || {};

	return (
		<div className={styles.whole_container}>
			<div className={styles.container}>
				{controls.map((controlItem) => {
					const Element = getFieldController(controlItem.type);

					if (!Element) return null;

					return (
						<div key={`${name}.${index}.${controlItem.name}`} className={styles.control_container}>
							<div className={styles.label}>
								{controlItem.label}
							</div>

							<div className={styles.control}>
								<Element
									key={`${name}.${index}.${controlItem.name}`}
									control={control}
									id={`create_form_${controlItem.name}_field`}
									{...(controlItem.type === FIELD_TYPE_UPLOAD
										? removeTypeField(controlItem) : { ...controlItem })}
									name={`${name}.${index}.${controlItem.name}`}
									className={styles[`element_${controlItem.name}`]}
									options={controlItem?.name === 'degree' && name === 'educational_qualification'
										? educationLevelOptions?.[education_level] : controlItem?.options}
									disabled={
										!!(controlItem?.name === 'degree' && disable_options.includes(education_level))
}
								/>

								<div className={styles.error_message}>
									{error?.[controlItem?.name]?.message}
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className={styles.button}>
				{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
					<IcMDelete
						className={`form-fieldArray-${name}-remove`}
						onClick={() => remove(index, REMOVE_INDEX)}
						style={{
							height : 26,
							width  : 26,
							cursor : 'pointer',
						}}
					/>
				) : null}
			</div>
		</div>
	);
}
export default Child;
