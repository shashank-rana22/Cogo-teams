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

	const organizationOptions = useGetAsyncOptions({
		...asyncFieldsOrganizations(),
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

	let modifiedControls = [];
	if (activeTab === 'feedbacks_received') {
		modifiedControls = controlsFeedbacks(
			organizationOptions || {},
			kamOptions || {},
			kamManagerOptions || {},
		);
	} else if (activeTab === 'requests_sent') {
		modifiedControls = controlsRequests(organizationOptions || {});
	} else {
		modifiedControls = null;
	}

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
		</div>
	);
}

export default Filters;
