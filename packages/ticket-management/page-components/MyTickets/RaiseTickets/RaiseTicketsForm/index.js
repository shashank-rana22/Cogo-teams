import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useRef, useEffect } from 'react';

import useRaiseTicketcontrols from '../../../../configurations/filter-controls';
import { FINANCE_PLATFORM_KEYS, PLATFORM_KEYS, RATE_KEYS, SHIPMENT_RATE_KEYS } from '../../../../constants';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

const CHILD_NODE = 8;

const REQUEST_TYPES = ['shipment', 'rate'];

const CONTROLS_MAPPING = {
	shipment       : SHIPMENT_RATE_KEYS,
	rate           : RATE_KEYS,
	finance        : FINANCE_PLATFORM_KEYS,
	platform_issue : PLATFORM_KEYS,
};

function RaiseTicketsForm({
	watch = () => {},
	control = {},
	formState = {},
	additionalInfo = [],
	resetField = () => {},
	setAdditionalInfo = () => {},
	setValue = () => {},
	setDefaultTypeId = () => {},
}) {
	const { errors = {} } = formState || {};

	const { t } = useTranslation(['myTickets']);

	const [subCategories, setSubCategories] = useState([]);
	const [raiseToDesk, setRaiseToDesk] = useState([]);

	const formRef = useRef(null);
	const watchRequestType = watch('request_type');
	const watchOrgId = watch('organization_id');
	const watchUserId = watch('user_id');
	const watchCategory = watch('category');
	const watchSubCategory = watch('sub_category');
	const watchIssueType = watch('issue_type');
	const watchService = watch('service');
	const watchTradeType = watch('trade_type');
	const watchRaisedToDesk = watch('raised_to_desk');
	const watchRaisedByDesk = watch('raised_by_desk');
	const watchIdType = watch('id_type');
	const watchServiceType = watch('service_type');
	const watchPlatformCategory = watch('platform_category');

	const additionalControls = (additionalInfo || []).map((item) => ({
		label          : item,
		name           : item,
		controllerType : 'text',
		placeholder    : `${t('myTickets:add')} ${item}`,
		showOptional   : false,
	}));

	const formattedSubCategories = (subCategories || []).map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const formatRaiseToDeskOptions = (raiseToDesk || []).map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const defaultControls = useRaiseTicketcontrols({
		setAdditionalInfo,
		watchRequestType,
		watchSubCategory,
		setDefaultTypeId,
		watchTradeType,
		watchCategory,
		watchService,
		watchUserId,
		watchOrgId,
		resetField,
		setValue,
		formattedSubCategories,
		setSubCategories,
		t,
		setRaiseToDesk,
		formatRaiseToDeskOptions,
		watchRaisedToDesk,
		watchRaisedByDesk,
		watchServiceType,
		watchIdType,
		watchPlatformCategory,
	});

	const filteredControls = defaultControls
		.filter((val) => CONTROLS_MAPPING[watchRequestType || 'shipment']?.includes(val.name));

	const controls = filteredControls?.concat(additionalControls);

	useEffect(() => {
		if (!isEmpty(watchIssueType) && REQUEST_TYPES.includes(watchRequestType)) {
			formRef.current?.childNodes?.[CHILD_NODE]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [watchIssueType, watchRequestType]);

	useEffect(() => {
		SHIPMENT_RATE_KEYS.forEach((element) => {
			if (element !== 'request_type') { resetField(element); }
		});

		PLATFORM_KEYS.forEach((element) => {
			if (element !== 'request_type') { resetField(element); }
		});
	}, [resetField, watchRequestType]);

	return (
		<div ref={formRef} className={styles.form}>
			{controls.map((controlItem) => {
				const elementItem = { ...controlItem };
				const { name, label, controllerType } = elementItem || {};
				const Element = getFieldController(controllerType);

				const checkUserId = name === 'user_id' && isEmpty(watchOrgId);
				const checkServiceType = name === 'service_type' && (isEmpty(watchIdType) || watchIdType === 'sid');
				const checkService = name === 'service' && watchRequestType !== 'shipment' && watchIdType !== 'sid'
				&& watchPlatformCategory !== 'Shipment Bookings';

				const checkPlatforSid = name === 'serial_id' && !['shipment', 'rate']?.includes(watchRequestType)
				&& (!watchPlatformCategory || watchPlatformCategory !== 'Shipment Bookings');

				const checkPlatforTrade = name === 'trade_type' && !['shipment', 'rate']?.includes(watchRequestType)
				&& (!watchPlatformCategory || watchPlatformCategory !== 'Shipment Bookings');

				if (checkServiceType || checkService || checkUserId || checkPlatforSid || checkPlatforTrade) {
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
									&& (
										<div className={styles.info_label}>
											(
											{t('myTickets:max_200_characters')}
											)
										</div>
									)}
								</div>
							)}
						<Element
							{...elementItem}
							size="sm"
							key={name}
							control={control}
							id={`${name}_input`}
						/>
						<div className={styles.error}>
							{errors?.[controlItem.name] && t('myTickets:required')}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default RaiseTicketsForm;
