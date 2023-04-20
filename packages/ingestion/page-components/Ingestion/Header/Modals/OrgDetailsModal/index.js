import { CONSTANT_KEYS } from '../../../../../constants/org-details-mapping';
import { getElementController } from '../../../../../utils/get-element-controls';

import { LeadDiv } from './NextHeading';
import styles from './styles.module.css';

function OrgDetailsModal({
	uploadData, formProps = {}, modalControls = [],
}) {
	const { control, formState: { errors } } = formProps;

	const {
		LEAD,
	} = CONSTANT_KEYS;

	const INGESTION_COMPONENTS_MAPPING = {
		[LEAD]: LeadDiv,
	};

	const TopDiv = INGESTION_COMPONENTS_MAPPING[uploadData?.ingestion_type] || null;

	return (

		<div>
			<div className={styles.modal_container}>
				{
						TopDiv && <TopDiv />
					}
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
