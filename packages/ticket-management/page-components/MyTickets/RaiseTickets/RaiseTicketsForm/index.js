import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

import useRaiseTicketcontrols from '../../../../configurations/filter-controls';
import { FINANCE_PLATFORM_KEYS, SHIPMENT_RATE_KEYS } from '../../../../constants';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

const CHILD_NODE = 8;

const REQUEST_TYPES = ['shipment', 'rate'];

const CONTROLS_MAPPING = {
	shipment       : SHIPMENT_RATE_KEYS,
	rate           : SHIPMENT_RATE_KEYS,
	finance        : FINANCE_PLATFORM_KEYS,
	platform_issue : FINANCE_PLATFORM_KEYS,
};

function RaiseTicketsForm({
	watch = () => {}, control = {}, formState = {}, additionalInfo = [], resetField = () => {},
	setAdditionalInfo = () => {}, setValue = () => {},
}) {
	const [subCategories, setSubCategories] = useState([]);

	const { errors = {} } = formState || {};

	const formRef = useRef(null);
	const watchRequestType = watch('request_type');
	const watchOrgId = watch('organization_id');
	const watchUserId = watch('user_id');
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
		setAdditionalInfo,
		watchRequestType,
		watchSubCategory,
		watchTradeType,
		watchCategory,
		watchService,
		watchUserId,
		watchOrgId,
		resetField,
		setValue,
		formattedSubCategories,
		setSubCategories,
	});

	const filteredControls = defaultControls
		.filter((val) => CONTROLS_MAPPING[watchRequestType || 'shipment']?.includes(val.name));

	const controls = filteredControls?.concat(additionalControls);

	const DISABLE_MAPPING = {
		issue_type: [watchRequestType],
	};

	useEffect(() => {
		if (!isEmpty(watchIssueType) && REQUEST_TYPES.includes(watchRequestType)) {
			formRef.current?.childNodes?.[CHILD_NODE]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [watchIssueType, watchRequestType]);

	useEffect(() => {
		SHIPMENT_RATE_KEYS.forEach((element) => {
			if (element !== 'request_type') { resetField(element); }
		});
	}, [resetField, watchRequestType]);

	return (
		<div ref={formRef} className={styles.form}>
			{controls.map((controlItem) => {
				const elementItem = { ...controlItem };
				const { name, label, controllerType } = elementItem || {};
				const Element = getFieldController(controllerType);

				if ((name === 'user_id' && isEmpty(watchOrgId))
				|| (name === 'serial_id' && (isEmpty(watchOrgId) || isEmpty(watchUserId)))) {
					return null;
				}

				if (!Element) { return null; }

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
