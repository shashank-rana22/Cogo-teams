import { AsyncSelectController, CheckboxController } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';

import checkBulkUpdateStakeholderFormValid from '../../helpers/checkBulkUpdateStakeholderFormValid';

import styles from './styles.module.css';

const STAKEHOLDERS_CONTROLS = {
	valueKey    : 'user_id',
	labelKey    : 'query_name',
	asyncKey    : 'partner_users',
	initialCall : true,
	size        : 'sm',
	params      : {
		filters: {
			partner_entity_types: ['cogoport'],
		},
	},
};

const DESCRIPTION_DETAILS_KEYS = ['container_size', 'container_type', 'commodity', 'trade_type'];

export default function EditBulkStakeholders({ fields = [], formProps = {}, fieldArrayKey = '' }) {
	const { control, formState: { errors }, clearErrors, setError } = formProps;

	const fieldArrayErrors = errors?.[fieldArrayKey];

	return (
		<div className={styles.form_container}>
			{fields.map((field, index) => {
				const { id: fieldId, service_type, shipment_type } = field;

				const DETAILS_TO_SHOW = [];
				DESCRIPTION_DETAILS_KEYS.forEach((key) => {
					if (!isEmpty(field[key])) {
						DETAILS_TO_SHOW.push(startCase(field[key]));
					}
				});

				return (
					<div key={fieldId} className={styles.form_item_container}>

						<div className={styles.form_item}>
							<div className={styles.check_box_container}>
								<CheckboxController
									control={control}
									name={`${fieldArrayKey}.${index}.is_checked`}
									rules={{
										validate: (_, formValues) => checkBulkUpdateStakeholderFormValid({
											formValues, fieldArrayKey, clearErrors, setError,
										}),
									}}
								/>

								{startCase(service_type)}
								{startCase(shipment_type)}
							</div>

							<div className={styles.service_additional_details}>
								{!isEmpty(DETAILS_TO_SHOW)
									? (
										<div className={styles.description_details}>
											(
											{DETAILS_TO_SHOW.join(', ')}
											)
										</div>
									)
									: null}

								{fieldArrayErrors?.[index]?.is_checked ? (
									<div className={styles.error_text}>
										{fieldArrayErrors?.[index]?.is_checked?.message}
									</div>
								) : null}
							</div>
						</div>

						<AsyncSelectController
							{...STAKEHOLDERS_CONTROLS}
							name={`${fieldArrayKey}.${index}.new_stakeholder`}
							control={control}
						/>
					</div>
				);
			})}
		</div>
	);
}
