import {
	InputController,
	MultiselectController,
	SelectController,
	TextAreaController,
	AsyncSelectController,
	useForm,
} from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import React, { useImperativeHandle, forwardRef, useEffect } from 'react';

import styles from './styles.module.css';

const HUNDERED_PERCENT = 100;
const TOTAL_SPAN = 12;

const CONTROLLER_MAPPINGS = {
	text        : InputController,
	select      : SelectController,
	multiSelect : MultiselectController,
	textArea    : TextAreaController,
	asyncSelect : AsyncSelectController,
};

function Form({ controls = () => { }, setLevel = () => { }, editData = () => {} }, ref) {
	const { t } = useTranslation(['incidentManagement']);

	const { incidentType = '', approvalType = '', incidentSubType = '', entityCode = '' } = editData;
	const { formState: { errors }, control, handleSubmit, watch, setValue } = useForm(
		{
			defaultValues: {
				incidentType,
				approvalType,
				incidentSubtype: incidentSubType,
				entityCode,
			},
		},
	);

	const finalControls = controls({ t, incidentType: watch('incidentType'), setValue });

	useImperativeHandle(ref, () => ({ formSubmit: handleSubmit, watch }));

	const isMultipleLevel = watch('approvalType');

	useEffect(() => {
		setLevel(isMultipleLevel);
	}, [isMultipleLevel, setLevel]);

	return (
		<section className={styles.flex}>
			{finalControls.map((controlItem) => {
				const { span, show = true } = controlItem || {};
				const el = { ...controlItem };
				const Element = CONTROLLER_MAPPINGS[el.type];
				if (!Element) return null;
				return (
					<div
						className={styles.col}
						key={el.name}
						style={{ width: `${(span || TOTAL_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN)}%` }}
					>
						{show
							&& (
								<>
									<Element
										{...el}
										control={control}
										key={el.name}
										id={`${el.name}_input`}
										disabled={editData?.id && el.name !== 'approvalType'}
									/>
									<div className={styles.error_message}>
										{errors?.[el.name]?.message}
									</div>
								</>
							)}
					</div>
				);
			})}
		</section>
	);
}

export default forwardRef(Form);
