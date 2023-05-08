/* eslint-disable react-hooks/rules-of-hooks */
import { useGetAsyncOptions } from '@cogoport/forms';

import FieldArray from './ChildFormat';
import { getElementController } from './getElementController';
import styles from './styles.module.css';

const getOptionsProps = async (controlItem) => {
	const { label_key: labelKey, value_key: valueKey, dynamic_data_endpoint: endPoint } = controlItem || {};

	const optionsprops = await useGetAsyncOptions({
		labelKey    : labelKey || '',
		valueKey    : valueKey || '',
		endpoint    : endPoint || '',
		initialCall : true,
		params      : {
			page_limit: 100,
		},
	});

	return optionsprops || {};
};

function FormLayout({ controls, control, errors, showElements = {} }) {
	return (
		<div className={styles.flex_container}>
			{(controls || []).map((controlItem) => {
				const { name, type, label } = controlItem;
				const controlStyle = controlItem?.style;
				const Element = getElementController(type);

				const show = !(controlItem.name in showElements) || showElements[controlItem.name];

				const { options_type } = controlItem || {};

				const asyncOptionsProps = options_type === 'dynamic_data' ? getOptionsProps(controlItem) : {};

				if (!show || !Element) {
					return null;
				}

				if (type === 'fieldArray') {
					return (
						<FieldArray
							{...controlItem}
							name={name}
							key={`${name}_${type}`}
							control={control}
							showElements={showElements?.[name]}
							error={errors?.[name]}
						/>
					);
				}

				const finalProps = { ...controlItem };

				if (type === 'location-select') {
					delete finalProps.style;
				}

				if (type === 'file' && controlStyle) {
					controlStyle.maxWidth = controlStyle?.flexBasis;
				}

				if (type === 'checkbox') {
					controlStyle.padding = '4px';
				}

				return (
					<div className={styles.flex_item} style={{ ...controlStyle }}>
						<div>
							{controlItem.type !== 'checkbox' ? (
								<div className={styles.label}>{label}</div>
							) : null}

							<div>
								<Element
									{...finalProps}
									key={`${name}_${type}`}
									itemKey={`${name}_${type}`}
									control={control}
									id={`${name}`}
									{...asyncOptionsProps}
								/>
								{(errors?.[name]?.message || errors?.[name]?.type) && (
									<div className={styles.error_message}>
										{label}
										{' '}
										is
										{' '}
										{errors?.[name]?.message || errors?.[name]?.type}
									</div>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default FormLayout;
