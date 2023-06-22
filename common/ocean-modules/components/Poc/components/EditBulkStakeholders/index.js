import { AsyncSelectController, CheckboxController, useFieldArray, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import getEditBulkStakeholdersDefaultValues from '../../helpers/getEditBulkStakeholdersDefaultValues';
import getServicesWithStakeholder from '../../helpers/getServicesWithStakeholder';

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

export default function EditBulkStakeholders({ servicesList = [], addPoc = {} }) {
	const { stakeholderTaggedInServices } = getServicesWithStakeholder({ servicesList, ...addPoc });

	const { DEFAULT_VALUES, FIELD_ARRAY_KEY } = getEditBulkStakeholdersDefaultValues({
		services: stakeholderTaggedInServices,
		...addPoc,
	});

	const { control } = useForm({ defaultValues: DEFAULT_VALUES });
	const { fields } = useFieldArray({ control, name: FIELD_ARRAY_KEY });

	return (
		<div>
			{fields.map(({ id: fieldId, trade_type, service_type }, index) => (
				<div key={fieldId} className={styles.form_item}>
					<div className={styles.check_box_container}>
						<CheckboxController
							control={control}
							name={`${FIELD_ARRAY_KEY}.${index}.is_checked`}
						/>
						{startCase(service_type)}
						{trade_type ? ` (${startCase(trade_type)}) ` : null}
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
