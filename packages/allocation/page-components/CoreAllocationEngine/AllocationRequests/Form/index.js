import { InputController, MultiselectController, SelectController } from '@cogoport/forms';

import styles from './styles.module.css';

export const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		case 'multiSelect':
			return MultiselectController;

		default:
			return null;
	}
};

function Form(props) {
	const { data, formProps, controls } = props;
	const {
		control, formState: { errors },
	} = formProps;

	return (
		<section className={styles.form_container}>
			{controls.map((controlItem) => {
				const el = { ...controlItem };

				const Element = getElementController(el.type);

				if (!Element) return null;

				return (
					<div className={styles.form_group}>
						<span>{el.label}</span>

						<div className={styles.input_group}>
							<Element
								{...el}
								key={el.name}
								control={control}
								id={`${el.name}_input`}
							/>

							<div className={styles.error_message}>
								{errors?.[el.name]?.message}
							</div>
						</div>
					</div>
				);
			})}
		</section>
	);
}

export default Form;
