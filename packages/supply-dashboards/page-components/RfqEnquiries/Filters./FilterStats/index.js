import { Radio, Checkbox, Tags } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useGetPartnerUser from '../../hooks/useGetPartneruser';
import useGetPartnerUserServices from '../../hooks/useGetPartnerUserServices';

function MissingRateStats({
	loading, stats, filters, setFilters, tab,
}) {
	// const { freight } = filters;
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	const { partner_user } = useGetPartnerUser({
		user_id: user_profile.id,
	});
	const options = useGetPartnerUserServices({ partner_user, tab });
	const handleChange = () => {};
	const handleServiceClick = () => {};
	return (
		<div>
			<Radio
				className="primary lg"
				label="Reverted "
				checked
				onChange={handleChange}
			/>
			<div>
				<Checkbox label="Under Negotiation 1" />
				<Checkbox label="Under Negotiation 2" />
			</div>
			<Radio
				className="primary lg"
				checked
				label="Not Reverted"
				onChange={handleChange}
			/>
			<div>
				<Checkbox label="Expiring in 20 days" />
				<Checkbox label="Expiring in 20 days" />
				<Checkbox label="Critical" />
			</div>
			<div>Select Service</div>
			{/* <div>
				{options.map(({ label, value }) => (
					<Tags
						className={value === freight ? 'active' : 'primary'}
						onClick={() => handleServiceClick(value)}
					>
						{`${label} `}
						{' '}
						{value === freight && (
							<IcMTick style={{ marginLeft: '4px' }} size={0.7} />
						)}
					</Tags>
				))}

			</div> */}
		</div>
	);
}
export default MissingRateStats;
