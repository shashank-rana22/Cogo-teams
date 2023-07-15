import {
	useFormContext,
	InputController,
	MultiselectController,
	SelectController,
	TextAreaController,
} from '@cogoport/forms';
import React from 'react';

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

		default:
			return null;
	}
};

function Form({ controls = [] }) {
	const { formState: { errors } } = useFormContext() || {};
	return (
		<section className={styles.flex}>
			{controls.map((controlItem) => {
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

export default Form;
