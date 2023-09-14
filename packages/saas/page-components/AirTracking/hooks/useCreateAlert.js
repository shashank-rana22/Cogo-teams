import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import getMappingObject from '../constant/card';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const USER_TYPE_MAPPING = {
	SHIPPER   : 'shipper',
	CONSIGNEE : 'consignee',
	DEFAULT   : 'default',

};

const CREATE_ALERT_URL = {
	ocean : '/create_update_saas_container_alert',
	air   : '/create_update_saas_air_alert',
};

let isShipper = false;
let isConsignee = false;

const preFilledFn = ({ prevAlertData }) => {
	const prefilValue = {
		shipper   : [],
		consignee : [],
		dsr       : [],
	};
	const pocDetails = [];
	const shipperArr = [];
	const consigneeArr = [];

	prevAlertData.forEach((value) => {
		const { dsr } = prefilValue;
		const { poc_details = {}, dsr_status_report = {}, alerts_configured = [] } = value || {};
		const { id, user_type } = poc_details || {};

		const pocId = id;

		pocDetails.push(poc_details);

		shipperArr.push(user_type === 'SHIPPER');
		consigneeArr.push(user_type === 'CONSIGNEE');

		const usertType = USER_TYPE_MAPPING[user_type ?? 'DEFAULT'];
		prefilValue[usertType] = [...(prefilValue[usertType] || []), pocId];

		if (dsr_status_report?.status === 'TRUE') {
			prefilValue.dsr = [...dsr, pocId];
		}

		alerts_configured.forEach((alerts) => {
			const { is_active = false, alert_name = '' } = alerts || {};

			if (is_active) {
				const prevAlert = prefilValue?.[alert_name] || [];
				prefilValue[alert_name] = [...prevAlert, pocId];
			}
		});
	});

	isShipper = shipperArr.includes(true);
	isConsignee = consigneeArr.includes(true);

	return { prefilValue, pocDetails };
};

const useCreateAlert = ({
	tableValue, setTableValue, prevAlertData = [], selectContactList, alertList = [],
	shipmentId = '', closeHandler, setSelectContactList, activeTab = 'ocean',
}) => {
	const { query } = useRouter();

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : CREATE_ALERT_URL[activeTab],
	}, { manual: true });

	const GET_MAPPING = getMappingObject({ t });

	const { TRACKER_ID_KEY } = GET_MAPPING[activeTab];

	const contactList = useMemo(() => {
		const prevSelectedContact = (prevAlertData || []).map((item) => item?.poc_details);

		const uniqueContactList = selectContactList.filter((item) => (
			!prevSelectedContact.some((ele) => ele?.id === item?.id)
		));

		return [...prevSelectedContact, ...uniqueContactList];
	}, [prevAlertData, selectContactList]);

	useEffect(() => {
		if (!isEmpty(prevAlertData)) {
			const { prefilValue, pocDetails } = preFilledFn({ prevAlertData });
			setTableValue(prefilValue);
			setSelectContactList(pocDetails);
		}
	}, [prevAlertData, setTableValue, setSelectContactList]);

	const createPayload = () => {
		const { shipper = [], consignee = [], dsr = [], ...alertKey } = tableValue || {};

		const alert_configuration = activeTab === 'ocean' ? contactList.map((contact) => {
			const pocId = contact?.id;

			const eventList = alertList.map((alert) => {
				const { milestone = '', alert_name = '', alert_types = [], alert_medium = [] } = alert || {};
				const currentAlertValue = alertKey?.[alert_name] || [];
				const isAlertActive = currentAlertValue?.includes(pocId);

				let alertId;

				if (!isEmpty(prevAlertData)) {
					const pocSub = prevAlertData.find((item) => item?.poc_details?.id === pocId) || {};
					const pocSubAlert = pocSub?.alerts_configured?.find(
						(prevAlert) => prevAlert?.alert_name === alert_name,
					);
					if (pocSubAlert) {
						alertId = pocSubAlert?.id;
					}
				}

				return {
					milestone,
					alert_name,
					alert_types,
					alert_medium,
					is_active : isAlertActive,
					id        : alertId,
				};
			});

			return {
				poc_id     : pocId,
				dsr_report : dsr.includes(pocId),
				event      : eventList,
			};
		}) : [];

		return {
			shipper                : shipper[0],
			consignee              : consignee[0],
			alert_configuration,
			[TRACKER_ID_KEY]       : shipmentId,
			organization_branch_id : query?.branch_id,
		};
	};

	const createAlertHandler = async () => {
		const payloadData = createPayload();
		try {
			await trigger({
				data: payloadData,
			});
			Toast.success(t('airOceanTracking:tracking_alerts_created_toast'));
			closeHandler();
		} catch (err) {
			console.error(err);
		}
	};

	const submitHandler = () => {
		const { shipper = [], consignee = [] } = tableValue || {};

		if (isEmpty(shipper) && isEmpty(consignee)) {
			Toast.error(t('airOceanTracking:tracking_alerts_select_consignee_toast'));
			return;
		}
		createAlertHandler();
	};

	const checkboxChangeHandler = ({ name, contactInfo }) => (e) => {
		let values = tableValue?.[name] || [];
		if (e.target.checked) {
			if ((name === 'shipper' || name === 'consignee')) {
				values = [contactInfo?.id];
				const consigneeArr = tableValue?.consignee || [];
				const shipperArr = tableValue?.shipper || [];
				const inConsignee = name === 'shipper' && consigneeArr.includes(contactInfo?.id);
				const inShipper = name === 'consignee' && shipperArr.includes(contactInfo?.id);

				if (inConsignee) {
					setTableValue((prev) => ({
						...prev,
						[name]    : values,
						consignee : [],
					}));
					return;
				}

				if (inShipper) {
					setTableValue((prev) => ({
						...prev,
						[name]  : values,
						shipper : [],
					}));
					return;
				}

				setTableValue((prev) => ({
					...prev,
					[name]: values,
				}));
			} else {
				values.push(contactInfo?.id);
			}
		} else {
			const matchIndex = values.findIndex((item) => item === contactInfo?.id);
			values.splice(matchIndex, 1);
		}
		setTableValue((prev) => ({
			...prev,
			[name]: values,
		}));
	};

	const disableCheckboxHandler = ({ name }) => {
		if (isEmpty(prevAlertData)) return false;

		if (name === 'shipper') {
			return isShipper;
		}

		if (name === 'consignee') {
			return isConsignee;
		}

		return false;
	};

	return {
		loading, submitHandler, checkboxChangeHandler, contactList, disableCheckboxHandler,
	};
};

export default useCreateAlert;
