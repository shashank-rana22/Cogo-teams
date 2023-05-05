import { IcMEdit, IcMDelete } from '@cogoport/icons-react';

import InfoHeader from '../page-components/InfoHeader';

export const RepositoryFields = {
	fields: [
		{
			key   : 'airline_id',
			label : 'Airlines',
			span  : 0.5,
			func  : 'handleAirline',
		},
		{
			key   : 'mode',
			label : 'Mode',
			span  : 0.4,
			func  : 'handleMode',
		},
		{
			key   : 'poc_name',
			label : (
				<InfoHeader
					heading="POC Name"
					content="Point of contact person"
				/>
			),
			span: 0.5,
		},
		{
			key   : 'email',
			label : 'Email (from airline)',
			span  : 0.8,
		},
		{
			key   : 'platform_url',
			label : 'Platform URL',
			span  : 1,
			func  : 'handlePlatformURL',
		},
		{
			key   : 'user_id',
			label : 'User Id (Platform)',
			span  : 0.8,
		},
		{
			key   : 'password',
			label : 'Password (Platform)',
			span  : 0.8,
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
			span : 0.3,
			func : 'handleAction',
		},
		{
			key   : 'edit_detail',
			label : '',
			span  : 1,
			func  : 'handleEditDetail',
		},
	],
};
