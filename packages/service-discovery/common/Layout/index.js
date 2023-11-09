import { cl } from '@cogoport/components';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import { isEmpty } from '@cogoport/utils';

import getElementController from '../../configs/getElementController';
import getErrorMessage from '../../configs/getErrorMessage';
import getOptions from '../../page-components/SearchResults/utils/getOptions';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENTAGE_FACTOR = 100;
const FLEX_OFFSET = 1;

function Layout({
	controls = [],
	control = () => {},
	watch = () => {},
	handleSubmit = () => {},
	setValue = () => {},
	errors = {},
	isSubControl = false,
	...restLayout
}) {
	return (
		<div className={`${styles.form} layout_form`}>
			{(controls || []).map((controlItem) => {
				let newControl = { ...controlItem };

				const { label, type, name, controls: innerControls, span, ...rest } = newControl;

				const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENTAGE_FACTOR - FLEX_OFFSET;

				if (['field-array', 'fieldArray'].includes(type)) {
					return (
						<div
							className={`${styles.form_item} layout_form_item`}
							key={`${name}_${label}`}
							style={{ width: `${flex}%` }}
						>
							<FieldArray
								{...newControl}
								control={control}
								watch={watch}
								handleSubmit={handleSubmit}
								error={errors?.[name]}
								setValue={setValue}
								{...restLayout}
							/>
						</div>
					);
				}

				if (innerControls && !isEmpty(innerControls)) {
					return (
						<div
							className={`${styles.form_item} layout_form_item`}
							key={`${name}_${label}`}
							style={{ width: `${flex}%`, marginBottom: '12px' }}
						>
							<div className={cl`${styles.label} layout_label 
							${newControl?.boldLabel && styles.bold_label}`}
							>
								{newControl?.boldLabel || label || ''}
								{' '}
								{(newControl?.rules?.required || newControl?.showRequired)
								&& (label || newControl?.boldLabel) ? (
									<div className={styles.required_mark}>*</div>
									) : null}
								{newControl?.showOptional ? (
									<div className={styles.optional_text}>Optional</div>
								) : null}
							</div>

							<Layout
								key={`${name}_${label}`}
								controls={innerControls}
								control={control}
								watch={watch}
								errors={errors}
								handleSubmit={handleSubmit}
								setValue={setValue}
								isSubControl
								{...restLayout}
							/>
						</div>
					);
				}

				if (rest.optionsListKey) {
					const finalOptions = getOptions(rest.optionsListKey, type);

					newControl = { ...newControl, options: finalOptions };
				}

				if (rest.commodityType) {
					const containerType = watch('container_type');

					const keyOptions = getCommodityList(rest.commodityType, containerType || null);

					const finalOptions = keyOptions;

					newControl = { ...newControl, options: finalOptions };
				}

				const Element = getElementController(type);

				const errorMessage = getErrorMessage({
					error : errors?.[newControl.name],
					rules : newControl?.rules,
					label : newControl?.label,
				});

				return (
					<div
						key={`${name}_${label}`}
						className={`${styles.form_item} layout_form_item`}
						style={{ width: `${flex}%`, marginBottom: isSubControl ? '12px' : '24px' }}
					>
						{isSubControl || type === 'checkbox' ? null : (
							<div className={cl`${styles.label} layout_label 
							${newControl?.boldLabel && styles.bold_label}`}
							>
								{newControl?.boldLabel || label || ''}
								{' '}
								{newControl?.rules?.required && (label || newControl?.boldLabel) ? (
									<div className={styles.required_mark}>*</div>
								) : null}
								{newControl?.showOptional ? (
									<div className={styles.optional_text}>(Optional)</div>
								) : null}
							</div>
						)}

						<Element
							{...newControl}
							name={name}
							label={label}
							control={control}
							{...(newControl?.uploaderType ? {
								type         : newControl?.uploaderType,
								uploaderType : null,
							} : {})}

						/>

						{errors[name] && (
							<div className={`${styles.error_message} layout_error_message`}>
								{errorMessage}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Layout;
