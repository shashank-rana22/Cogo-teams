import { AsyncSelectController, InputController } from '@cogoport/forms';
import { IcMDelete, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

const HUNDRED_PERCENT = 100;
const DEFAULT_SPAN = 1;
const TOTAL_SPAN = 12;
const DEFAULT_VAL = 1;
const DEFAULT_LENGTH = 1;
const MAX_LEVEL = 3;

function Column({
	config = {},
	control = {},
	errors = [],
	append = () => { },
	remove = () => { },
	index = 0,
	totalLength = 1,
	setValue = () => { },
	item = {},
	level = '',
}) {
	const { approvalLevelConditions } = errors;
	const { fields = [] } = config;

	useEffect(() => {
		const { level1 = {}, level2 = {}, level3 = {} } = item;
		const levels = [level1, level2, level3];

		(levels || []).forEach((lvl, idx) => {
			const { stakeholder = {} } = lvl || {};
			if (!isEmpty(stakeholder)) {
				setValue(`approvalLevelConditions.${idx + DEFAULT_VAL}.stakeholder`, stakeholder);
			}
		});
	}, [item, setValue]);

	const DATA = {
		levels: (
			<div className={styles.center}>
				Level -
				{index + DEFAULT_VAL}
			</div>
		),
		user: (
			<div className={styles.select}>
				<AsyncSelectController
					control={control}
					name={`approvalLevelConditions.${index}.user`}
					asyncKey="partner_users"
					valueKey="user_id"
					initialCall
					onChange={(val, obj) => {
						setValue(`approvalLevelConditions.${index}.stakeholder`, {
							userId    : obj?.user_id,
							userName  : obj?.name,
							userEmail : obj?.email,
						});
					}}
					rules={{ required: { value: true, message: 'User is required' } }}
				/>
				{approvalLevelConditions?.[index]?.user?.message
					? <div className={styles.message}>{approvalLevelConditions?.[index]?.user?.message}</div> : null}
			</div>
		),
		criteria: (
			<div className={styles.input}>
				<InputController
					control={control}
					name={`approvalLevelConditions.${index}.condition`}
					placeholder="Criteria"
					rules={{ required: { value: true, message: 'Criteria is required' } }}
				/>
				{approvalLevelConditions?.[index]?.condition?.message
					? (
						<div className={styles.message}>
							{approvalLevelConditions?.[index]?.condition?.message}
						</div>
					) : null}
			</div>
		),
		edit: (
			<div className={styles.buttons}>
				<div>
					{(totalLength < MAX_LEVEL && level === 'MULTIPLE' && totalLength === index + DEFAULT_LENGTH) ? (
						<IcMPlus
							height={20}
							width={20}
							onClick={() => append({})}
							className={styles.plus}
						/>
					) : null}
					{totalLength > DEFAULT_LENGTH ? (
						<IcMDelete
							height={20}
							width={20}
							onClick={() => remove(index)}
							className={styles.delete}
						/>
					) : null}
				</div>
			</div>
		),
	};
	return (
		<div className={styles.flex}>
			{fields.map((field) => (
				<div
					key={field.key}
					style={{
						'--span' : field.span || DEFAULT_SPAN,
						width    : `${((field.span || DEFAULT_SPAN) * (HUNDRED_PERCENT / TOTAL_SPAN))}px`,
					}}
					className={styles.col}
				>
					{DATA[field.key]}
				</div>
			))}
		</div>
	);
}

export default Column;
