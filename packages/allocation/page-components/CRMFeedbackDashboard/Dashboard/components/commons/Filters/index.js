import { Select, DateRangepicker, MultiSelect } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOrganizations,
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';
import { useState } from 'react';

import { controlsFeedbacks, controlsRequests } from './controls';
import styles from './styles.module.css';

function Filters({ pageFilters = {}, onChangeFilters = () => {}, activeTab = '' }) {
	const [date, setDate] = useState();

	const cogoEntityOptions = useGetAsyncOptions({
		labelKey    : 'business_name',
		valueKey    : 'id',
		endpoint    : 'list_partners',
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
			},
		},
	});

	const organizationOptions = useGetAsyncOptions({
		...asyncFieldsOrganizations(),
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
			},
		},
	});

	const leadOrganizationOptions = useGetAsyncOptions({
		labelKey    : 'business_name',
		valueKey    : 'id',
		endpoint    : 'list_lead_organizations',
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
			},
		},
	});

	const kamManagerOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
			},
		},
		valueKey: 'user_id',
	});

	const kamOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		params      : {
			filters: {
				status               : 'active',
				reporting_manager_id : pageFilters?.kam_manager,
			},
		},
	});

	const getElements = (type = '') => {
		switch (type) {
			case 'select':
				return Select;
			case 'multiSelect':
				return MultiSelect;
			default:
				return null;
		}
	};

	const modifiedControls = activeTab === 'feedbacks_received'
		? (
			controlsFeedbacks(
				cogoEntityOptions || {},
				organizationOptions || {},
				leadOrganizationOptions || {},
				kamOptions || {},
				kamManagerOptions || {},
			)
		) : (
			controlsRequests(
				organizationOptions || {},
				leadOrganizationOptions || {},
			)
		);

	return (
		<div className={styles.filter}>
			{modifiedControls?.map((control) => {
				const Element = getElements(control.type);
				return (
					<Element
						key={control.name}
						placeholder={control.placeholder}
						className={styles.select}
						value={pageFilters?.[control?.name]}
						onChange={(val) => onChangeFilters({ [control?.name]: val || undefined })}
						{...control}
					/>
				);
			})}

			{activeTab === 'feedbacks_received' ? (
				<DateRangepicker
					className={styles.time}
					value={date}
					isPreviousDaysAllowed
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
