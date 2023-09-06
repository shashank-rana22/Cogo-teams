import { SelectController, InputController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import selectionCriteriaOptions from '../formOptions/selectionCriteriaOptions';
import serviceTypeOptions from '../formOptions/serviceTypeOptions';
import styles from '../styles.module.css';

function DetailForm({ control = {}, watch = () => {} }) {
	const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities)?.map((item) => ({
		value : String(item),
		label : `${item} - ${GLOBAL_CONSTANTS.cogoport_entities[item].name}`,
	}));

	return (
		<div className={styles.formBody}>
			<div className={styles.form_input}>
				<div className={styles.label}>Entity</div>
				<SelectController
					control={control}
					name="entity"
					options={ENTITY_OPTIONS}
					placeholder="Enter Entity"
					rules={{ required: true }}
				/>
			</div>
			<div className={styles.form_input}>
				<div className={styles.label}>Service</div>
				<SelectController
					control={control}
					name="serviceType"
					options={serviceTypeOptions}
					placeholder="Enter Service"
					rules={{ required: true }}
				/>
			</div>
			<div className={styles.form_input}>
				<div className={styles.label}>Trade Type</div>
				<SelectController
					control={control}
					name="tradeType"
					options={[
						{ label: 'IMPORT', value: 'import' },
						{ label: 'EXPORT', value: 'export' },
						{ label: 'LOCAL', value: 'local' },
						{ label: 'DOMESTIC', value: 'domestic' }]}
					placeholder="Enter Trade Type"
					rules={{ required: true }}
				/>
			</div>
			<div className={styles.form_input}>
				<div className={styles.label}>Selection Criteria 1</div>
				<SelectController
					control={control}
					name="selectionCriteriaOp"
					options={selectionCriteriaOptions(watch('serviceType'))}
					placeholder="Enter Selection Criteria"
					rules={{ required: true }}
				/>
			</div>
			<div className={styles.form_input}>
				<div className={styles.label}>Selection Criteria 2</div>
				<SelectController
					control={control}
					name="selectionCriteriaFin"
					options={selectionCriteriaOptions(watch('serviceType'))}
					placeholder="Enter Selection Criteria"
					rules={{ required: true }}
				/>
			</div>
			<div className={styles.form_input}>
				<div className={styles.label}>Level1</div>
				<InputController name="level1" size="md" placeholder="Level 1" required control={control} />

			</div>
			<div className={styles.form_input}>
				<div className={styles.label}>Level2</div>
				<InputController name="level2" size="md" placeholder="Level 2" required control={control} />

			</div>
		</div>
	);
}
export default DetailForm;
