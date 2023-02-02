import { getFieldController } from '../../../../common/Form/Controlled';

import styles from './styles.module.css';

// Todo put it in a mapping remove switch case

function Form(props) {
	const { formProps, controls } = props;
	const {
		control, formState: { errors },
	} = formProps;

	return (
		<section className={styles.form_container}>
			{controls.map((controlItem) => {
				const el = { ...controlItem };

				const Element = getFieldController(el.type);

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
