import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function FormComponent(props) {
	const { formProps, controls = [] } = props;
	const {
		control, formState: { errors },
	} = formProps;

	return (

		(controls.map((singleField) => {
			const el = { ...singleField };

			const Element = getFieldController(el.type);

			if (!Element) return null;

			return (
				<>
					<div className={styles.row_level}>
						{singleField.label}

						<div className={styles.supporting_text}>Score</div>

						<div>
							<Element
								{...singleField}
								key={singleField.label}
								control={control}
								id={singleField.name}
							/>

							{errors[singleField.name] && (
								<span className={styles.errors}>
									{errors[singleField.name].message}
								</span>
							)}
						</div>
					</div>

					<div className={styles.border_class} />
				</>
			);
		}))

	);
}

export default FormComponent;
