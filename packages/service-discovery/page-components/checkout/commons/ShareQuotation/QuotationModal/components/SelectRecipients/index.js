import { CheckboxGroupController } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import { useMemo, useEffect } from 'react';

import getDistinctOptions from '../../../../../helpers/getDistinctOptions';

import controls from './controls';
import styles from './styles.module.css';

const geo = getGeoConstants();

function CheckboxLabel({ item }) {
	return (
		<div className={styles.label_container}>
			<div className={styles.name}>{startCase(item?.name)}</div>
			<div className={styles.email}>{item.email}</div>
		</div>
	);
}

function SelectRecipients({
	organization,
	selected,
	emailPreviews = {},
	recipientsControl: control,
	setValue,
	recipientWatch,
	orgUsersData,
	emailWatch,
	emailContent = {},
}) {
	const {
		query: { partner_id },
		agent_id,
		user_profile,
		agent_email,
	} = useSelector(({ general, profile }) => ({
		query        : general.query || {},
		agent_id     : profile?.id,
		user_profile : profile,
		agent_email  : profile.email || 'agentid@cogoport.com',
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

	console.log('selected', emailPreviews);

	const [{ data: salesOkamApiData = {} }] = useRequest({
		method : 'get',
		url    : '/list_partner_users',
		params : SalesOkamParams,
	}, { manual: false });

	const ccRecipients = useMemo(() => {
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
				{recipients.length && (
					<div className={styles.flex}>
						<div>
							To:
						</div>

						<CheckboxGroupController
							{...(controls[0])}
							options={recipients || []}
							id="checkout_send_emails_users_ids_select"
							control={control}
						/>
					</div>
				)}

				{ccRecipients.length && (
					<div className={`${styles.flex} ${styles.cc_user_ids}`}>
						<div>
							CC:
						</div>
						<CheckboxGroupController
							{...(controls[1])}
							options={[
								...(recipients || []).filter(
									(item) => !(recipientWatch().user_ids || []).includes(item.user_id),
								),
								...ccRecipients,
							]}
							id="checkout_send_emails_cc_user_ids_select"
							control={control}
						/>
					</div>
				)}
			</div>

			<div className={`${styles.label} ${styles.email_preview}`}>
				Email preview
				{' '}
				<span style={{ fontWeight: '500' }}>
					(sent from
					{' '}
					{agent_email}
					)
				</span>
			</div>
			<div className={styles.text}>
				Subject -
				{' '}
				{emailWatch()?.subject
					|| emailPreviews?.[selected?.tax_number]?.template?.subject
					|| emailPreviews?.main?.template?.subject
					|| 'Subject is required'}
			</div>
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{
					__html:
						emailPreviews?.[selected?.tax_number]?.template
						|| emailPreviews?.main?.template,
				}}
			/>
		</div>
	);
}

export default SelectRecipients;
