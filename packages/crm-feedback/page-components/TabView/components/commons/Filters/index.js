import { Select, DateRangepicker, MultiSelect } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOrganizations,
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';

import styles from './styles.module.css';
import { controlsFeedbacks, controlsRequests } from './utils/controls';

function Filters({ pageFilters = {}, onChangeFilters = () => {}, activeTab = '' }) {
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
				value={pageFilters.date}
				isPreviousDaysAllowed
				onChange={(val) => onChangeFilters({ date: val || undefined })}
			/>
		</div>
	);
}

export default Filters;
