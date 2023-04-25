import { getElementController } from '../../../../../utils/get-element-controls';

import styles from './styles.module.css';

function OrgDetailsModal({
	formProps = {}, modalControls = [],
}) {
	const { control, formState: { errors } } = formProps;

	return (

		<div>
			<div className={styles.modal_container}>
				<div className={styles.heading}>
					Please provide more details about Leads

				</div>
				{
						modalControls.map((controlItem) => {
							const el = { ...controlItem };

							const Element = getElementController(el.type);

							if (!Element) return null;

							return (
								<div style={el.style} className={styles.control_container}>
									<span className={styles.control_label}>{el.label}</span>

									<Element
										{...el}
										size="md"
										key={el.name}
										control={control}
										id={`${el.name}_input`}
										className={styles.field_controller}
									/>

									<div className={styles.error_message}>
										{errors?.[el.name]?.message}
									</div>
								</div>
							);
						})

            }

			</div>

		</div>

	);
}

export default OrgDetailsModal;
