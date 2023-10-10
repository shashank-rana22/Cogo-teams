import { cl } from '@cogoport/components';
import { CheckboxGroupController } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import { useMemo, useEffect } from 'react';

import getDistinctOptions from '../../../../../helpers/getDistinctOptions';

import controls from './controls';
import EmailPreview from './EmailPreview';
import styles from './styles.module.css';

const ONE = 1;

const geo = getGeoConstants();

function CheckboxLabel({ item = {} }) {
	const { name = '', email = '' } = item;

	return (
		<div className={styles.label_container}>
			<div className={styles.name}>{startCase(name)}</div>
			<div className={styles.email}>{email}</div>
		</div>
	);
}

function SelectRecipients({
	organization = {},
	selected = '',
	emailPreviews = {},
	recipientsControl: control = {},
	setValue = () => {},
	recipientWatch = '',
	orgUsersData = {},
	emailWatch = '',
	emailContent = {},
	loading = false,
}) {
	const {
		query: { partner_id },
		agent_id,
		user_profile,
		agent_email,
	} = useSelector(({ general, profile: { user = {} } = {} }) => ({
		query        : general.query || {},
		agent_id     : user?.id,
		user_profile : user,
		agent_email  : user?.email || GLOBAL_CONSTANTS.cogoport_agent_email_id,
	}));

	const user_ids = [organization?.agent_id, agent_id];

	const partnerUsersParams = {
		filters: {
			partner_id,
			user_id: [...new Set(user_ids)],
		},
	};

	const [{ data = {} }] = useRequest({
		method : 'get',
		url    : '/list_partner_users',
		params : partnerUsersParams,
	}, { manual: false });

	const SalesOkamParams = {
		filters: {
			role_ids        : geo.uuid.customer_service_role_ids, // okam
			sales_agent_ids : [user_profile?.id],
		},
	};

	const [{ data: salesOkamApiData = {} }] = useRequest({
		method : 'get',
		url    : '/list_partner_users',
		params : SalesOkamParams,
	}, { manual: false });

	const ccRecipientsForEnterprise = useMemo(() => {
		const list = (data?.list || []).map((item) => ({
			label : <CheckboxLabel item={item} />,
			value : item?.user_id,
			...item,
		}));
		const managerList = (data?.list || [])
			.filter((e) => e?.manager)
			.map((item) => ({
				label : <CheckboxLabel item={item?.manager} />,
				value : item?.manager_id,
				...item,
			}));
		const okamList = (salesOkamApiData.list || []).map((item) => ({
			label : <CheckboxLabel item={item} />,
			value : item?.user_id,
			...item,
		}));

		return [...list, ...managerList, ...okamList];
	}, [data?.list, salesOkamApiData.list]);

	const recipients = useMemo(() => {
		const list = getDistinctOptions(
			orgUsersData.list || [],
			'user_id',
		).map((item) => ({
			label : <CheckboxLabel item={item} />,
			value : item?.user_id,
			...item,
		}));
		return list;
	}, [orgUsersData.list]);

	const ccRecipients = (recipients || []).filter(
		(item) => !(recipientWatch().user_ids || []).includes(item.user_id),
	);

	const CC_RECIPIENTS_MAPPING = {
		true  : [...(ccRecipients || []), ...(ccRecipientsForEnterprise || [])],
		false : ccRecipients,
	};

	const showAdditionalRecipients = organization?.sub_type === 'enterprise' || organization?.tags?.includes('partner');

	const ccRecipientsOptions = CC_RECIPIENTS_MAPPING[showAdditionalRecipients] || ccRecipients;

	useEffect(() => {
		const finalKey = selected === 'main' ? 'main' : selected.tax_number;

		if (!isEmpty(emailContent[finalKey])) {
			setValue('user_ids', emailContent[finalKey]?.user_ids);
			setValue('cc_user_ids', emailContent[finalKey]?.cc_user_ids);
		} else {
			setValue('user_ids', []);
			setValue('cc_user_ids', []);
		}
	}, [emailContent, selected, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.form_container}>
				{recipients.length ? (
					<div className={styles.flex}>
						<div>
							To:
						</div>

						<CheckboxGroupController
							{...(controls[GLOBAL_CONSTANTS.zeroth_index])}
							options={recipients || []}
							id="checkout_send_emails_users_ids_select"
							control={control}
						/>
					</div>
				) : null}

				{(ccRecipientsOptions || []).length ? (
					<div className={cl`${styles.flex} ${styles.cc_user_ids}`}>
						<div>
							CC:
						</div>
						<CheckboxGroupController
							{...(controls[ONE])}
							options={ccRecipientsOptions || []}
							id="checkout_send_emails_cc_user_ids_select"
							control={control}
						/>
					</div>
				) : null}
			</div>

			<EmailPreview
				emailPreviews={emailPreviews}
				emailWatch={emailWatch}
				loading={loading}
				agent_email={agent_email}
				selected={selected}
			/>
		</div>
	);
}

export default SelectRecipients;
