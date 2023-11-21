import { Button, cl } from '@cogoport/components';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import { IcMDelete } from '@cogoport/icons-react';

import getElementController from '../../../configs/getElementController';
import getErrorMessage from '../../../configs/getErrorMessage';
import getOptions from '../../../page-components/SearchResults/utils/getOptions';

import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENTAGE_FACTOR = 100;
const FLEX_OFFSET = 1;
const FIRST_INDEX = 1;
const MIN_ELEMENTS_TO_SHOW_DELETE = 2;

const getTruckOptions = (truck, country_id) => {
	const countryData = getCountryConstants({ country_id });

	const MAPPING = {
		open   : countryData?.options?.open_truck || [],
		closed : countryData?.options?.closed_truck || [],
	};

	return MAPPING[truck] || [];
};

function Child({
	controls = [],
	control = () => {},
	index = 0,
	name = 0,
	remove = () => {},
	disabled = false,
	showLabelOnce = false,
	lowerlabel = '',
	error = {},
	length = 0,
	setValue = () => {},
	isSubControl = false,
	fieldArrayValues = {},
	data = {},
	childLabel = '',
}) {
	return (
		<div className={styles.form_container}>
			{!isSubControl && childLabel ? (
				<h3 className={styles.child_label}>
					{childLabel}
					{' '}
					{index + 1}
				</h3>
			) : null}

			<div className={styles.content}>
				{controls.map((controlItem, childIndex) => {
					let newControl = { ...controlItem };

					const {
						type,
						name: controlName,
						optionsListKey = '',
						commodityType = '',
						span,
						subLabel = '',
						controls: subControls,
					} = newControl;

					let flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENTAGE_FACTOR - FLEX_OFFSET;

					flex = `${flex}%`;

					const deletable = length >= MIN_ELEMENTS_TO_SHOW_DELETE && !disabled && !isSubControl;

					if (childIndex === controls.length - 1 && deletable) {
						flex = `calc(${flex} - 50px)`;
					}

					if (subControls) {
						return (
							<div
								key={name}
								className={cl`${styles.form_item} ${isSubControl && styles.sub_control}`}
								style={{ width: flex, marginBottom: '12px' }}
							>
								{newControl?.showTopLabelOnly ? (
									<div className={styles.heading}>
										{newControl.label || lowerlabel}
										{newControl?.rules?.required && (newControl.label || lowerlabel) ? (
											<div className={styles.required_mark}>*</div>
										) : null}
									</div>
								) : null}

								<Child
									key={name}
									index={index}
									control={control}
									controls={subControls}
									name={name}
									lowerlabel={lowerlabel}
									remove={remove}
									error={error}
									fieldArrayValues={fieldArrayValues}
									disabled={disabled}
									length={length}
									showLabelOnce={showLabelOnce}
									setValue={setValue}
									isSubControl
									childLabel={childLabel}
								/>
							</div>
						);
					}

					if (name === 'trucks' && controlName === 'truck_type') {
						const truck = fieldArrayValues?.[index]?.truck;

						const finalOptions = getTruckOptions(truck, data?.origin_country_id);

						newControl = { ...newControl, options: finalOptions };
					}

					if (optionsListKey) {
						const finalOptions = getOptions(optionsListKey, type);

						newControl = { ...newControl, options: finalOptions };
					}

					if (commodityType) {
						const containerType = fieldArrayValues?.[index]?.container_type;

						const keyOptions = getCommodityList(commodityType, containerType);

						const finalOptions = keyOptions;

						newControl = { ...newControl, options: finalOptions };
					}

					const Element = getElementController(type);

					const errorOriginal = getErrorMessage({
						error : error?.[controlName],
						rules : controlItem?.rules,
						label : controlItem?.label,
					});

					return (
						<div
							className={styles.form_item}
							style={{ width: flex, marginBottom: isSubControl ? '12px' : '24px' }}
							key={`create_form_${newControl.name}_${index}`}
						>
							{(showLabelOnce && !index && !isSubControl)
							|| (!showLabelOnce && !isSubControl) ? (
								<div className={styles.heading}>
									{newControl.label || lowerlabel}
									{newControl?.rules?.required && (newControl.label || lowerlabel) ? (
										<div className={styles.required_mark}>*</div>
									) : null}
								</div>
								) : null}

							<Element
								width="100%"
								key={`create_form_${newControl.name}_${index}`}
								itemKey={`create_form_${newControl.name}_${index}`}
								control={control}
								id={`create_form_${newControl.name}_${index}`}
								{...newControl}
								disabled={disabled}
								name={`${name}[${index}].${newControl.name}`}
								onChange={(val, obj) => {
									if (typeof newControl?.onChange === 'function') {
										newControl?.onChange(val, obj, index);
									}
								}}
							/>
							{subLabel ? (
								<div className={styles.sub_label}>{subLabel}</div>
							) : null}

							{errorOriginal ? (
								<div className={styles.error_message}>
									{errorOriginal}
								</div>
							) : null}
						</div>
					);
				})}

				{length >= MIN_ELEMENTS_TO_SHOW_DELETE && !disabled && !isSubControl ? (
					<div className={styles.remove_button}>
						<Button
							size="md"
							type="button"
							themeType="tertiary"
							onClick={() => remove(index, FIRST_INDEX)}
						>
							<IcMDelete className={styles.remove_icon} />
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
}
export default Child;
