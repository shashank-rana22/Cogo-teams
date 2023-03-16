import {
	Radio, Checkbox, Tabs, TabPanel,
} from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useGetPartnerUser from '../../hooks/useGetPartneruser';
import useGetPartnerUserServices from '../../hooks/useGetPartnerUserServices';

import styles from './styles.module.css';

function FilterStats({ filters, hookSetters }) {
	const { service_type } = filters;
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	const { partner_user } = useGetPartnerUser({
		user_id: user_profile?.user?.id,
	});
	const options = useGetPartnerUserServices({ partner_user });
	const handleChange = (value) => {
		if (value === 'not_reverted') {
			hookSetters.setFilters({
				...filters,
				is_negotiation_not_reverted : true,
				is_negotiation_reverted     : undefined,
				page                        : 1,
			});
		} else {
			hookSetters.setFilters({
				...filters,
				is_negotiation_reverted     : true,
				is_negotiation_not_reverted : undefined,
				page                        : 1,
			});
		}
	};
	const handleOnClick = (value) => {
		hookSetters.setFilters((prev) => ({
			...prev,
			service_type            : value,
			page                    : 1,
			origin_port_id          : undefined,
			destinaton_port_id      : undefined,
			origin_airport_id       : undefined,
			destination_airport_id  : undefined,
			origin_location_id      : undefined,
			destination_location_id : undefined,
		}));
	};

	const handleOnChangeCheckbox = (value, checkbox) => {
		if (checkbox === 'under_negotiation') {
			let { under_negotiation_rank } = filters;
			if (under_negotiation_rank === value) { under_negotiation_rank = undefined; } else {
				under_negotiation_rank = value;
			}
			hookSetters.setFilters({ ...filters, under_negotiation_rank, page: 1 });
		} else {
			let { expires_in } = filters;
			if (expires_in === value) {
				expires_in = undefined;
			} else {
				expires_in = value;
			} hookSetters.setFilters({ ...filters, expires_in, page: 1 });
		}
	};
	const onTabChange = (tab) => {
		hookSetters.setFilters({
			...filters,
			negotiation_status : tab,
			page               : 1,
		});
	};

	return (
		<div className={styles.filter}>
			<div className={styles.heading}>RFQ Status</div>
			<div>
				<Tabs size="lg" fullWidth activeTab={filters.type} onChange={onTabChange}>
					<TabPanel name="awaiting_responses" title="Running" />
					<TabPanel name="completed" title="Archive" />
				</Tabs>
			</div>
			<div className={styles.radio}>
				<Radio
					label="Reverted "
					checked={filters.is_negotiation_reverted}
					onChange={() => { handleChange('reverted'); }}
				/>

			</div>
			<div className={styles.checkbox_container}>
				<Checkbox
					className={styles.checkbox}
					label="Under Negotiation 1"
					checked={(filters.under_negotiation_rank || []).includes('1')}
					onChange={() => handleOnChangeCheckbox('1', 'under_negotiation')}
				/>
				<Checkbox
					className={styles.checkbox}
					label="Under Negotiation 2"
					checked={(filters.under_negotiation_rank || []).includes('2')}
					onChange={() => handleOnChangeCheckbox('2', 'under_negotiation')}
				/>
			</div>
			<div className={styles.radio}>
				<Radio
					checked={filters.is_negotiation_not_reverted}
					label="Not Reverted"
					onChange={() => { handleChange('not_reverted'); }}
				/>

			</div>

			<div className={styles.checkbox_container}>
				<Checkbox
					className={styles.checkbox}
					label="Expiring in 20 days"
					checked={filters?.expires_in === '20'}
					onChange={() => handleOnChangeCheckbox('20', 'expires_in')}
				/>
				<Checkbox
					className={styles.checkbox}
					label="Expiring in 8 days"
					checked={filters?.expires_in === '8'}
					onChange={() => handleOnChangeCheckbox('8', 'expires_in')}
				/>
			</div>
			<div className={styles.heading}>Select Service</div>
			<div className={styles.service}>
				{options.map(({ label, value }) => (
					<button
						className={value === service_type ? styles.tag_active : styles.tag_primary}
						onClick={() => handleOnClick(value)}
					>
						{`${label} `}
						{' '}
						{value === service_type && (
							<IcMTick style={{ marginLeft: '4px' }} size={0.7} />
						)}
					</button>
				))}

			</div>
		</div>
	);
}
export default FilterStats;
