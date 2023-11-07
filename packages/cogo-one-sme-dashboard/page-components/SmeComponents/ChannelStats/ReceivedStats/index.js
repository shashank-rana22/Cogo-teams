import { IcMDefault } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { LoadingState, PercentageChange } from '../../../../common/Elements';
import { ICONS_MAPPING } from '../../../../constants';
import calcChange from '../../../../helpers/calcChange';

import styles from './styles.module.css';

const DATA_KEYS = {
	emails: {
		initiated_by_customer : 'initiated_by_customer',
		total_count           : 'total_mails_received',
	},
	whatsapp: {
		initiated_by_customer : 'initiated_by_customer',
		total_count           : 'total_messages_received',
	},
};

function ReceivedStats({
	channelType = '',
	dashboardData = {},
	dashboardLoading = false,
}) {
	const receivedData = dashboardData?.[`total_${channelType}_received_data`] || {};

	const Element = ICONS_MAPPING?.[channelType] || IcMDefault;

	const { current_data = {}, previous_data = {} } = receivedData || {};

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.label}>
					Total
					{' '}
					{startCase(channelType)}
					{' '}
					Received
				</div>

				<div className={styles.body}>
					{dashboardLoading
						? <LoadingState />
						: (
							<>
								<div className={styles.icon_container}>
									<Element
										className={styles.icon_styles}
										fill={channelType === 'emails' ? '#034AFD' : 'unset'}
									/>
								</div>

								<div className={styles.total_data}>
									<div className={styles.total_count}>
										{current_data?.[DATA_KEYS?.[channelType]?.total_count]}
									</div>

									<PercentageChange
										percentageChanged={calcChange({
											valueKey     : DATA_KEYS?.[channelType]?.total_count,
											currentData  : current_data,
											previousData : previous_data,
										})}
										showArrows
									/>
								</div>
							</>
						)}
				</div>
			</div>
			{current_data?.[DATA_KEYS?.[channelType]?.initiated_by_customer]
				? (
					<div className={styles.header_chip}>
						Initiated by Customer -
						<span className={styles.highlight}>
							{current_data?.[DATA_KEYS?.[channelType]?.initiated_by_customer] || 0}
							%
						</span>
					</div>
				) : null}
		</div>
	);
}

export default ReceivedStats;
