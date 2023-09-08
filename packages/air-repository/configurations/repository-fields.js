import { IcMEdit, IcMDelete } from '@cogoport/icons-react';

import InfoHeader from '../page-components/InfoHeader';

export const repositoryFields = (t = () => {}) => ({
	fields: [
		{
			key   : 'airline_id',
			label : t('airRepository:airlines_field_label'),
			span  : 1.5,
			func  : 'handleAirline',
		},
		{
			key   : 'airport_id',
			label : t('airRepository:airport_field_label'),
			span  : 2.5,
			func  : 'handleAirport',
		},
		{
			key   : 'booking_mode',
			label : t('airRepository:booking_mode_field_label'),
			span  : 1.5,
			func  : 'handleMode',
		},
		{
			key   : 'lms_url',
			label : t('airRepository:lms_url_field_label'),
			span  : 1.5,
			func  : 'handlePlatformURL',
		},
		{
			key   : 'lms_user_id',
			label : t('airRepository:lms_user_id_field_label'),
			span  : 1,
		},
		{
			key   : 'lms_password',
			label : t('airRepository:lms_password_field_label'),
			span  : 1,
		},
		{
			key   : 'ams_mode',
			label : t('airRepository:ams_mode_field_label'),
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
								{t('airRepository:edit_repository')}
							</span>
							<span>
								<IcMDelete fill="#F68B21" width={14} height={14} style={{ marginRight: 12 }} />
								{t('airRepository:delete_repository')}
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
			span  : 2.2,
			func  : 'handleEditDetail',
		},
	],
});
