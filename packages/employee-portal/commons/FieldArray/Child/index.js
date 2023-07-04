import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../getFieldController';

import styles from './styles.module.css';

const REMOVE_INDEX = 1;

const FIELD_TYPE_UPLOAD = 'fileUpload';

const DELETE_BUTTON_HEIGHT = '26px';
const DELETE_BUTTON_WIDTH = '26px';
const DELETE_BUTTON_CURSOR = 'pointer';
const DISABLE_OPTIONS = ['10th', '12th', 'Diploma'];
const COUNTRY_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';

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

	const countrySpecificOptions = getCountryConstants({ country_id: COUNTRY_ID });
	const educationLevelOptions = countrySpecificOptions?.options?.education_level;

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
										!!(controlItem?.name === 'degree' && DISABLE_OPTIONS.includes(education_level))
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
							height : DELETE_BUTTON_HEIGHT,
							width  : DELETE_BUTTON_WIDTH,
							cursor : DELETE_BUTTON_CURSOR,
						}}
					/>
				) : null}
			</div>
		</div>
	);
}
export default Child;
