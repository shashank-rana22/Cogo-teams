import { IcMEdit, IcMDelete } from '@cogoport/icons-react';

import InfoHeader from '../page-components/InfoHeader';

export const RepositoryFields = {
	fields: [
		{
			key   : 'airline_id',
			label : 'Airlines',
			span  : 1.5,
			func  : 'handleAirline',
		},
		{
			key   : 'airport_id',
			label : 'Airport',
			span  : 3,
			func  : 'handleAirport',
		},
		{
			key   : 'booking_mode',
			label : 'Mode',
			span  : 1.5,
			func  : 'handleMode',
		},
		{
			key   : 'lms_url',
			label : 'Platform URL',
			span  : 2.5,
			func  : 'handlePlatformURL',
		},
		{
			key   : 'lms_user_id',
			label : 'User Id (Platform)',
			span  : 1,
		},
		{
			key   : 'lms_password',
			label : 'Password (Platform)',
			span  : 1,
		},
		{
			key   : 'action',
			label : (
				<InfoHeader
					heading="Action"
					content={(
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<span>
								<IcMEdit fill="#F68B21" width={14} height={14} style={{ marginRight: 12 }} />
								Edit Repository
							</span>
							<span>
								<IcMDelete fill="#F68B21" width={14} height={14} style={{ marginRight: 12 }} />
								Delete Repository
							</span>
						</div>
					)}
				/>
			),
			span : 0.8,
			func : 'handleAction',
		},
		{
			key   : 'edit_detail',
			label : '',
			span  : 1.7,
			func  : 'handleEditDetail',
		},
	],
};
