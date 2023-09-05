import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

import useRaiseTicketcontrols from '../../../../configurations/filter-controls';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

const CHILD_NODE = 5;

function RaiseTicketsForm({
	watch = () => {}, control = {}, formState = {}, additionalInfo = [], resetField = () => {},
	setAdditionalInfo = () => {},
}) {
	const { errors = {} } = formState || {};
	const [subCategories, setSubCategories] = useState([]);
	console.log('control', control);
	const formRef = useRef(null);

	const watchOrgId = watch('organization_id');
	const watchCategory = watch('category');
	const watchSubCategory = watch('sub_category');
	const watchIssueType = watch('issue_type');
	const watchService = watch('service');
	const watchTradeType = watch('trade_type');

	const additionalControls = (additionalInfo || []).map((item) => ({
		label          : item,
		name           : item,
		controllerType : 'text',
		placeholder    : `add ${item}`,
		showOptional   : false,
	}));

	const formattedSubCategories = (subCategories || []).map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const defaultControls = useRaiseTicketcontrols({
		formattedSubCategories,
		setAdditionalInfo,
		setSubCategories,
		watchSubCategory,
		watchTradeType,
		watchCategory,
		watchService,
		watchOrgId,
		resetField,
	});
	const controls = defaultControls?.concat(additionalControls);
	console.log('controls', controls);
	const DISABLE_MAPPING = {
		sub_category : [watchCategory],
		issue_type   : [watchCategory, watchSubCategory, watchTradeType, watchService],
	};

	useEffect(() => {
		if (!isEmpty(watchIssueType)) {
			formRef.current?.childNodes?.[CHILD_NODE].scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [watchIssueType]);

	return (
		<div ref={formRef}>
			{controls.map((controlItem) => {
				const elementItem = { ...controlItem };
				const { name, label, controllerType } = elementItem || {};
				const Element = getFieldController(controllerType);

				if (!Element) { return null; }

				if (name === 'user_id' && isEmpty(watchOrgId)) { return null; }

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
							disabled={DISABLE_MAPPING[name]?.some(isEmpty)}
						/>
						<div className={styles.error}>{errors?.[controlItem.name] && 'Required'}</div>
					</div>
				);
			})}
		</div>
	);
}

export default RaiseTicketsForm;
