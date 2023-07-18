import {
	InputController,
	MultiselectController,
	SelectController,
	TextAreaController,
	AsyncSelectController,
	useForm,
} from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import styles from './styles.module.css';

const HUNDERED_PERCENT = 100;
const TOTAL_SPAN = 12;

const getElementController = (type) => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		case 'multiSelect':
			return MultiselectController;

		case 'textArea':
			return TextAreaController;

		case 'asyncSelect':
			return AsyncSelectController;

		default:
			return null;
	}
};

function Form({ controls = () => { } }, ref) {
	const { formState: { errors }, control, handleSubmit, watch } = useForm();

	const finalControls = controls({ incidentType: watch('incidentType') });

	useImperativeHandle(ref, () => ({ formSubmit: handleSubmit, watch }));
	return (
		<section className={styles.flex}>
			{finalControls.map((controlItem) => {
				const { span, show = true } = controlItem || {};
				const el = { ...controlItem };
				const Element = getElementController(el.type);
				if (!Element) return null;
				return (
					<div
						className={styles.col}
						key={el.name}
						style={{ width: `${(span || TOTAL_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN)}%` }}
					>
						{show
							&& (
								<>
									<Element
										{...el}
										control={control}
										key={el.name}
										id={`${el.name}_input`}
									/>
									<div className={styles.error_message}>
										{errors?.[el.name]?.message}
									</div>
								</>
							)}
					</div>
				);
			})}
		</section>
	);
}

export default forwardRef(Form);
