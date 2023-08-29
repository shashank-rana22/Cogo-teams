import { Select, DateRangepicker } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsLeadOrganization,
	asyncFieldsOrganizations,
	asyncFieldsPartner,
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { controlsFeedbacks, controlsRequests } from './controls';
import styles from './styles.module.css';

const geo = getGeoConstants();

function Filters({
	pageFilters = {},
	onChangeFilters = () => {},
	activeTab = '',
}) {
	const { t } = useTranslation(['allocation']);

	const [date, setDate] = useState({});

	const cogoEntityOptions = useGetAsyncOptions({
		...asyncFieldsPartner(),
		initialCall: false,
	});

	const organizationOptions = useGetAsyncOptions({
		...asyncFieldsOrganizations(),
		initialCall: false,
	});

	const leadOrganizationOptions = useGetAsyncOptions({
		...asyncFieldsLeadOrganization(),
		initialCall: false,
	});

	const kamManagerOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		valueKey    : 'user_id',
		params      : {
			filters: {
				status     : 'active',
				partner_id : geo.uuid.parent_entity_id,
			},
			page_limit: 100,
		},
	});

	const kamOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		valueKey    : 'user_id',
		params      : {
			filters: {
				status               : 'active',
				partner_id           : geo.uuid.parent_entity_id,
				reporting_manager_id : pageFilters?.manager_id || undefined,
			},
			page_limit: 100,
		},
	});

	const modifiedControls = activeTab === 'feedbacks_received'
		? (
			controlsFeedbacks(
				cogoEntityOptions || {},
				organizationOptions || {},
				leadOrganizationOptions || {},
				kamOptions || {},
				kamManagerOptions || {},
				t,
			)
		) : (
			controlsRequests(
				organizationOptions || {},
				leadOrganizationOptions || {},
				t,
			)
		);

	return (
		<div className={styles.filter}>
			{modifiedControls.map((control) => (
				<Select
					key={control.name}
					placeholder={control.placeholder}
					className={styles.select}
					value={pageFilters?.[control.name]}
					onChange={(val) => onChangeFilters({ [control.name]: val || undefined })}
					{...control}
				/>
			))}

			{activeTab === 'feedbacks_received' ? (
				<DateRangepicker
					className={styles.time}
					value={date}
					isPreviousDaysAllowed
					maxDate={new Date()}
					onChange={(val) => {
						onChangeFilters({
							created_at_greater_than : val.startDate || undefined,
							created_at_less_than    : val.endDate || undefined,
						});
						setDate(val);
					}}
				/>
			) : (
				null
			)}

		</div>
	);
}

export default Filters;
