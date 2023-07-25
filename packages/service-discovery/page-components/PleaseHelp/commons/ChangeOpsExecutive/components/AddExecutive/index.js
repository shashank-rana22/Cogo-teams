import { Button } from '@cogoport/components';

import getElementController from '../../../forms/getElementController';

import styles from './styles.module.css';
import useCreateNewUser from './useCreateNewUser';

function AddExecutive({
	organization_id,
	branch_id,
	setAddExecutive,
	onUpdate = () => {},
}) {
	const {
		loading,
		errors,
		createUser,
		control,
		handleSubmit,
		controls,
	} = useCreateNewUser({
		branch_id,
		organization_id,
		onUpdate,
		setAddExecutive,
	});

	const onSubmit = async (values) => {
		await createUser(values);
	};

	return (
		<div className={styles.container}>
			<div className={styles.layout_container}>
				{controls.map((controlItem) => {
					const { type, label, name, rules } = controlItem || {};

					const Element = getElementController(type);

					if (!Element) return null;

					return (
						<div key={name} className={`${styles.form_group} ${styles[name]}`}>
							<div className={styles.label}>
								{label}
								{rules ? <sup className={styles.superscipt}>*</sup> : null}
							</div>

							<div className={`${styles.input_group} ${styles[name]}`}>
								<Element
									{...controlItem}
									control={control}
									id={`${name}_input`}
								/>
							</div>

							{errors?.[name]?.message ? (
								<div className={styles.error_message}>
									{errors?.[name]?.message}
								</div>
							) : null}
						</div>
					);
				})}
			</div>

			<div className={styles.button_container}>
				<Button
					disabled={loading}
					onClick={() => setAddExecutive(false)}
					style={{ marginRight: 12 }}
				>
					Back
				</Button>

				<Button loading={loading} onClick={handleSubmit(onSubmit)}>
					Add
				</Button>
			</div>
		</div>
	);
}

export default AddExecutive;
