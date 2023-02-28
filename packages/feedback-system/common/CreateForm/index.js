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
	const { handleSubmit = () => {}, control, formState: { errors }, reset } = formProps;

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.container}
		>
			<section className={styles.form_content}>
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
					themeType="tertiary"
					onClick={() => {
						reset();
						onCancel();
					}}
				>
					Cancel
				</Button>
				<Button
					size="md"
					type="submit"
					loading={loading}
					themeType="primary"
				>
					{startCase(type)}
				</Button>

			</div>
		</form>
	);
}

export default CreateForm;
