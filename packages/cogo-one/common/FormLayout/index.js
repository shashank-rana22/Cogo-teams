import { cl } from '@cogoport/components';

import { getFieldController } from '../../utils/getFieldController';

import styles from './styles.module.css';

function FormLayout({
	control = {},
	controls = [],
	errors = {},
	showElements = {},
}) {
	return (
		<div className={cl`${styles.container} ${cl.ns('form_container')}`}>
			{controls.map((eachControl) => {
				const { controlType, name, label, width = '50%', customStyles = {} } = eachControl || {};
				const Element = getFieldController(controlType);

				const show = !(name in showElements) || showElements[name];

				if (!Element || !show) {
					return null;
				}

				return (
					<div
						className={cl`${styles.each_element} ${cl.ns('form_element')}`}
						key={name}
						style={{ width }}
					>
						<label className={cl`${styles.label_styles} ${cl.ns('form_element_label')}`}>
							{label}
						</label>
						<Element
							control={control}
							{...eachControl}
							error={errors?.[name]}
							style={customStyles}
						/>
						<div className={cl`${styles.error_text} ${cl.ns('form_element_error')}`}>
							{
								(controlType !== 'fieldArray' && errors?.[name])
									? (errors[name]?.message || 'This is Required')
									: ''
							}
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default FormLayout;
