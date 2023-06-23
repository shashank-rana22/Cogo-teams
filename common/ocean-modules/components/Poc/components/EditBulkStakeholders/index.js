import { AsyncSelectController, CheckboxController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

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

export default function EditBulkStakeholders({ fields, errors, control, FIELD_ARRAY_KEY }) {
	const fieldArrayErrors = errors?.[FIELD_ARRAY_KEY];

	return (
		<div className={styles.form_container}>
			{fields.map(({ id: fieldId, trade_type, service_type }, index) => (
				<div key={fieldId} className={styles.form_item_container}>
					<div className={styles.form_item}>
						<div className={styles.check_box_container}>
							<CheckboxController
								control={control}
								name={`${FIELD_ARRAY_KEY}.${index}.is_checked`}
								rules={{
									validate: (_, formValues) => checkBulkUpdateStakeholderFormValid({
										formValues, FIELD_ARRAY_KEY,
									}),
								}}
							/>
							{startCase(service_type)}
							{trade_type ? ` (${startCase(trade_type)}) ` : null}
						</div>
						{fieldArrayErrors?.[index]?.is_checked ? (
							<div className={styles.error_text}>
								{fieldArrayErrors?.[index]?.is_checked?.message}
							</div>
						) : null}
					</div>

					<AsyncSelectController
						{...STAKEHOLDERS_CONTROLS}
						name={`${FIELD_ARRAY_KEY}.${index}.new_stakeholder`}
						control={control}
					/>
				</div>
			))}
		</div>
	);
}
