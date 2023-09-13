import { SelectController, InputController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import selectionCriteriaOptions from '../formOptions/selectionCriteriaOptions.json';
import serviceTypeOptions from '../formOptions/serviceTypeOptions.json';
import TRADE_TYPE_OPTIONS from '../formOptions/tradeTypeOptions.json';
import styles from '../styles.module.css';

const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities)?.map((item) => ({
	value : String(item),
	label : `${item} - ${GLOBAL_CONSTANTS.cogoport_entities[item].name}`,
}));

function DetailForm({ control = {}, watch = () => {}, errors = {}, setValue = () => {} }) {
	function Error({ keys = '' }) {
		return errors?.[keys]?.message ? <div className={styles.errors}>{errors?.[keys]?.message || ''}</div> : null;
	}
	return (
		<div className={styles.formBody}>
			<div className={styles.formInput}>
				<div className={styles.label}>Entity</div>
				<SelectController
					control={control}
					name="entity"
					options={ENTITY_OPTIONS}
					placeholder="Enter Entity"
					rules={{ required: { value: true, message: '*Entity is required' } }}

				/>
				<Error keys="entity" />

			</div>
			<div className={styles.formInput}>
				<div className={styles.label}>Service</div>
				<SelectController
					control={control}
					name="serviceType"
					options={serviceTypeOptions}
					placeholder="Enter Service"
					rules={{ required: { value: true, message: '*Service type is required' } }}
					onChange={() => {
						setValue('selectionCriteriaOp', ''); setValue('selectionCriteriaFin', '');
					}}
				/>
				<Error keys="serviceType" />

			</div>
			<div className={styles.formInput}>
				<div className={styles.label}>Trade Type</div>
				<SelectController
					control={control}
					name="tradeType"
					options={TRADE_TYPE_OPTIONS}
					placeholder="Enter Trade Type"
					rules={{ required: { value: true, message: '*Trade type is required' } }}
				/>
				<Error keys="tradeType" />

			</div>
			<div className={styles.formInput}>
				<div className={styles.label}>Selection Criteria 1</div>
				<SelectController
					control={control}
					name="selectionCriteriaOp"
					options={selectionCriteriaOptions[watch('serviceType')]}
					placeholder="Enter Selection Criteria"
					rules={{ required: { value: true, message: '*Selection criteria 1 is required' } }}
				/>
				<Error keys="selectionCriteriaOp" />

			</div>
			<div className={styles.formInput}>
				<div className={styles.label}>Selection Criteria 2</div>
				<SelectController
					control={control}
					name="selectionCriteriaFin"
					options={selectionCriteriaOptions[watch('serviceType')]}
					placeholder="Enter Selection Criteria"
					rules={{ required: { value: true, message: '*Selection criteria 2 is required' } }}
				/>
				<Error keys="selectionCriteriaFin" />

			</div>
			<div className={styles.formInput}>
				<div className={styles.label}>Level1</div>
				<InputController
					name="level1"
					size="md"
					placeholder="Level 1"
					rules={{ required: { value: true, message: '*No. of days is required' } }}
					control={control}
				/>
				<Error keys="level1" />

			</div>
			<div className={styles.formInput}>
				<div className={styles.label}>Level2</div>
				<InputController
					name="level2"
					size="md"
					placeholder="Level 2"
					rules={{ required: { value: true, message: '*No. of days is required' } }}
					control={control}
				/>
				<Error keys="level2" />

			</div>
		</div>
	);
}
export default DetailForm;
