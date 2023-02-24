import Form from '../../../../../common/Form';
import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateNewEvent from '../../../hooks/useCreateNewEvent';

import styles from './styles.module.css';

function CreateNewEvent() {
	const { controls, formProps } = useCreateNewEvent();

	const {
		control, formState: { errors },
	} = formProps;

	return (
		<div>
			<div className={styles.create_new_event}>
				Create New Event
			</div>

			<div className={styles.form_container}>
				<div className={styles.header}>
					#001

					<div className={styles.modified_data}>
						<div className={styles.modified_date}>Last Modified : 31/September/2023</div>
						<div>Last Modified By : Ankur Verma</div>
					</div>
				</div>

				<div style={{ display: 'flex' }}>
					<div className={styles.add_rule_container}>
						<div className={styles.add_rule_text}>
							Add Rule
						</div>

						<section className={styles.form_container}>
							{controls.map((controlItem) => {
								const el = { ...controlItem };

								const Element = getFieldController(el.type);

								if (!Element) return null;

								return (
									<div className={styles.form_group}>
										<span className={styles.label}>{el.label}</span>

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
								);
							})}
						</section>
					</div>

					<div className={styles.account_attributes}>
						Account Attribute
					</div>

				</div>
			</div>
		</div>
	);
}

export default CreateNewEvent;
