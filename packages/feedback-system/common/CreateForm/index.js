import { Button } from '@cogoport/components';

import { getElementController } from '../../utils/getElementController';

import styles from './styles.module.css';

function CreateForm({
	formProps,
	type = 'filter',
	controls,
	onSubmit = () => {},
	onCancel = () => {},
}) {
	const { handleSubmit = () => {}, control, formState: { errors } } = formProps;
	const submitButton = type === 'filter' ? 'Search' : 'Create';

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
		>

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
									id={`rnp_role_list_create_role_form_${el.name}_input`}
								/>

								<div className={styles.error_message}>
									{errors?.[el.name]?.message}
								</div>
							</div>
						</div>
					);
				})}
			</section>

			<div className={styles.button_container}>
				<Button
					size="md"
					style={{ marginRight: 10 }}
					themeType="secondary"
					onClick={() => onCancel()}
				>
					Cancel
				</Button>
				<Button
					size="md"
					type="submit"
				>
					{submitButton}
				</Button>

			</div>
		</form>
	);
}

export default CreateForm;
