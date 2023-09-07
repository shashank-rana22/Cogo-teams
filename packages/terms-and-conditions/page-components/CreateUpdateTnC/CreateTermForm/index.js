import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

import useCreateTermcontrols from '../../../configurations/filter-control';
import { getFieldController } from '../../../utlis/getFieldController';

import styles from './style.module.css';

function CreateTermForm({
	watch = () => {}, control = {}, formState = {}, additionalInfo = [], resetField = () => {},
	setAdditionalInfo = () => {},
}) {
	const watchShippingLineId = watch('shipping_line_id');
	const watchCountry = watch('country');
	const watchAirlineId = watch('airline_id');
	const watchTradeType = watch('trade_type');
	const watchService = watch('service');
	const watchPayingPartyCountry = watch('paying_party_country_ids');
	const additionalControls = (additionalInfo || []).map((item) => ({
		label          : item,
		name           : item,
		controllerType : 'text',
		placeholder    : `add ${item}`,
		showOptional   : false,
	}));
	const defaultControls = useCreateTermcontrols({
		setAdditionalInfo,
		watchPayingPartyCountry,
		watchShippingLineId,
		watchCountry,
		watchAirlineId,
		watchService,
		watchTradeType,
		resetField,
	});
	// useEffect(() => {
	// 	if (!isEmpty(watchIssueType)) {
	// 		formRef.current?.childNodes?.[CHILD_NODE].scrollIntoView({ behavior: 'smooth', block: 'start' });
	// 	}
	// }, [watchIssueType]);
	// console.log('hello', defaultControls, additionalControls);
	const controls = defaultControls?.concat(additionalControls);

	return (
		<>
			{controls.map((controlItem) => {
				const elementItem = { ...controlItem };
				const { name, label, controllerType } = elementItem || {};
				const Element = getFieldController(controllerType);
				if (!Element) { return null; }

				// if (name === 'user_id' && isEmpty(watchOrgId)) { return null; }

				return (
					<div
						key={controlItem.name}
						className={styles.field}
					>
						{label && controllerType !== 'checkbox'
							&& (
								<div className={styles.label}>
									<div className={styles.sub_label}>{label}</div>
									{controlItem.name === 'additional_information'
									&& <div className={styles.info_label}>(max 200 characters)</div>}
								</div>
							)}
						<Element
							{...elementItem}
							size="sm"
							key={name}
							control={control}
							id={`${name}_input`}
							// disabled={DISABLE_MAPPING[name]?.some(isEmpty)}
						/>
						{/* <div className={styles.error}>{errors?.[controlItem.name] && 'Required'}</div> */}
					</div>
				);
			})}
		</>
	);
}

export default CreateTermForm;
