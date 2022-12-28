import { Radio, Checkbox } from '@cogoport/components';
import IcMTick from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useGetPartnerUser from '../../hooks/useGetPartneruser';
import useGetPartnerUserServices from '../../hooks/useGetPartnerUserServices';

import styles from './styles.module.css';

function FilterStats({ filters, hookSetters }) {
	const { service } = filters;
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	const { partner_user } = useGetPartnerUser({
		user_id: user_profile.id,
	});
	const options = useGetPartnerUserServices({ partner_user });
	const handleChange = () => {
		hookSetters.setFilters({ ...filters, is_reverted: !filters.is_reverted });
	};
	const handleOnClick = (value) => {
		hookSetters.setFilters((prev) => ({ ...prev, service: value }));
	};
	return (
		<div>
			<Radio
				className="primary lg"
				label="Reverted "
				checked={filters.is_reverted}
				onChange={handleChange}
			/>
			<div>
				<Checkbox label="Under Negotiation 1" disabled={!filters.is_reverted} />
				<Checkbox label="Under Negotiation 2" disabled={!filters.is_reverted} />
			</div>
			<Radio
				className="primary lg"
				checked={filters.is_reverted === false}
				label="Not Reverted"
				onChange={handleChange}
			/>
			<div>
				<Checkbox label="Expiring in 20 days" disabled={filters.is_reverted} />
				<Checkbox label="Expiring in 8 days" disabled={filters.is_reverted} />
				<Checkbox label="Critical" disabled={filters.is_reverted} />
			</div>
			<div>Select Service</div>
			<div className={styles.service}>
				{options.map(({ label, value }) => (
					<button className={styles.tag} onClick={() => handleOnClick(value)}>
						{`${label} `}
						{' '}
						{value === service && (
							<IcMTick style={{ marginLeft: '4px' }} size={0.7} />
						)}
					</button>
				))}

			</div>
		</div>
	);
}
export default FilterStats;
