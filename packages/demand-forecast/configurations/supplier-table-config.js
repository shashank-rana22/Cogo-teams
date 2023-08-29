import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

const getSupplierTableConfig = ({ t }) => {
	const config = [
		{
			key   : 'supplier',
			title : t('demandForecast:supplier'),
			width : '40%',
		},
		{
			key   : 'win_probability',
			title : (
				<div style={{ display: 'flex' }}>
					{t('demandForecast:win_probability')}
					<Tooltip
						content={(
							<div style={{ wordBreak: 'break-word' }}>
								{t('demandForecast:win_probability_tooltip_content')}
							</div>
						)}
						placement="top"
					>
						<IcMInfo style={{ alignSelf: 'center', height: '100%', marginLeft: '2px' }} />
					</Tooltip>
				</div>
			),
			width: '15%',
		},
		{
			key   : 'capability',
			title : t('demandForecast:capability'),
			width : '15%',
		},
		{
			key   : 'rated_acquired',
			title : t('demandForecast:rated_added'),
			width : '15%',
		},
		{
			key   : 'ask_for_rates',
			width : '15%',
		},
	];

	return config;
};

export default getSupplierTableConfig;
