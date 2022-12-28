import {
	Radio, Checkbox, Tabs, TabsPanel,
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
		user_id: user_profile.id,
	});
	const options = useGetPartnerUserServices({ partner_user });
	const handleChange = (value) => {
		hookSetters.setFilters({ ...filters, is_negotiation_not_reverted: value });
	};
	const handleOnClick = (value) => {
		hookSetters.setFilters((prev) => ({ ...prev, service_type: value }));
	};
	return (
		<div className={styles.filter}>
			<div className={styles.heading}>RFQ Status</div>
			<div>
				<Tabs>
					<TabsPanel name="running" title="Running" />
					<TabsPanel name="archive" title="Archive" />
				</Tabs>
			</div>
			<div className={styles.radio}>
				<Radio
					label="Reverted "
					checked={filters.is_negotiation_not_reverted === false}
					onChange={() => { handleChange(false); }}
				/>

			</div>
			<div className={styles.checkbox_container}>
				<Checkbox
					className={styles.checkbox}
					label="Under Negotiation 1"
					checked={(filters.under_negotiation_rank || []).includes('1')}
					disabled={filters.is_negotiation_not_reverted}
				/>
				<Checkbox
					className={styles.checkbox}
					label="Under Negotiation 2"
					checked={(filters.under_negotiation_rank || []).includes('2')}
					disabled={filters.is_negotiation_not_reverted}
				/>
			</div>
			<div className={styles.radio}>
				<Radio
					checked={filters.is_negotiation_not_reverted}
					label="Not Reverted"
					onChange={() => { handleChange(true); }}
				/>

			</div>

			<div className={styles.checkbox_container}>
				<Checkbox
					className={styles.checkbox}
					label="Expiring in 20 days"
					disabled={!filters.is_negotiation_not_reverted}
				/>
				<Checkbox
					className={styles.checkbox}
					label="Expiring in 8 days"
					disabled={!filters.is_negotiation_not_reverted}
				/>
				<Checkbox
					className={styles.checkbox}
					label="Critical"
					disabled={!filters.is_negotiation_not_reverted}
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
