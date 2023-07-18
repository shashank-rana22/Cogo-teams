import { useFieldArray, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useImperativeHandle, forwardRef } from 'react';

import { LEVELS_CONFIG } from '../../Config/levels-config';
import Header from '../../Header';

import Column from './Column';
import styles from './styles.module.css';

function LevelForm({ background = '#f3fafa', item = {} }, ref) {
	const { level1 = {}, level2 = {}, level3 = {} } = item;
	const { stakeholder: stakeholderLevel1 = {}, condition: conditionLevel1 = '' } = level1 || {};
	const { userId: userLevel1 } = stakeholderLevel1;
	const { stakeholder: stakeholderLevel2 = {}, condition: conditionLevel2 = '' } = level2 || {};
	const { userId: userLevel2 } = stakeholderLevel2;
	const { stakeholder: stakeholderLevel3 = {}, condition: conditionLevel3 = '' } = level3 || {};
	const { userId: userLevel3 } = stakeholderLevel3;

	const getDefaultVal = () => {
		if (!isEmpty(level3)) {
			return [
				{ user: userLevel1, condition: conditionLevel1 },
				{ user: userLevel2, condition: conditionLevel2 },
				{ user: userLevel3, condition: conditionLevel3 },
			];
		} if (!isEmpty(level2)) {
			return [
				{ user: userLevel1, condition: conditionLevel1 },
				{ user: userLevel2, condition: conditionLevel2 },
			];
		}
		return [
			{ user: userLevel1, condition: conditionLevel1 },
		];
	};

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors = {} },
	} = useForm({ defaultValues: { approvalLevelConditions: !isEmpty(item) ? getDefaultVal() : [{}] } });

	useImperativeHandle(ref, () => ({ handleSubmit }));
	const { fields = [], append, remove } = useFieldArray({ control, name: 'approvalLevelConditions' });
	return (
		<div className={styles.container} style={{ backgroundColor: background }}>
			<Header config={LEVELS_CONFIG} />
			<div className={styles.paddingbottom}>
				{fields.map((field, index) => (
					<Column
						key={field.id}
						config={LEVELS_CONFIG}
						control={control}
						remove={remove}
						append={append}
						index={index}
						errors={errors}
						totalLength={fields.length}
						setValue={setValue}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}

export default forwardRef(LevelForm);
