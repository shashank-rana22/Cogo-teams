import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { getElementController } from '../../utils/getElementController';

import styles from './styles.module.css';

function CreateForm({
	formProps,
	type = '',
	loading = false,
	controls,
	onSubmit = () => {},
	onCancel = () => {},
}) {
	const { handleSubmit = () => {}, control, formState: { errors } } = formProps;

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
						<div style={{ width: `${Number(el.span) * 10}%` }} className={styles.form_group}>
							<span>{el.label}</span>
							<div style={{ width: '100%' }} className={styles.input_group}>
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
					loading={loading}
					themeType="accent"
				>
					{startCase(type)}
				</Button>

			</div>
		</form>
	);
}

export default CreateForm;
