/* eslint-disable import/no-cycle */
import React from 'react';

import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import { getElementController } from '../../../../utils/get-element-controller';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

const ButtonContainerStyle = {
	margin: '40px 0px 40px 0px',
};

function FormComponent({
	controls = [],
	handleSubmit = () => {},
	onSubmit = () => {},
	control,
	errors = {},
	activeStepper = {},
	setActiveStepper = () => {},
	watch = () => {},
	setValue = () => {},
}) {
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.main_body}>
			{controls.map((controlItem) => {
				const { span, name, label, noDeleteButtonTill, ...rest } = controlItem;

				if (rest.type === 'fieldArray') {
					return (
						<FieldArray
							{...controlItem}
							control={control}
							name={controlItem.name}
							error={errors?.[controlItem.name]}
							watch={watch}
							setValue={setValue}
							noDeleteButtonTill={noDeleteButtonTill}
						/>
					);
				}

				const Element = getElementController(rest.type);

				return (
					<div style={{ display: 'flex', flexDirection: 'column', flexBasis: span }}>
						<div className={styles.form_label}>{label}</div>
						<div>
							<Element
								key={name}
								{...controlItem}
								control={control}
								id={`onboard_vendor_form_${name}_input`}
							/>
						</div>
						<div className={styles.form_error_message}>
							{errors?.[controlItem.name]?.message}
						</div>
					</div>
				);
			})}

			<ButtonLayout
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				style={ButtonContainerStyle}
			/>
		</form>
	);
}

export default FormComponent;
