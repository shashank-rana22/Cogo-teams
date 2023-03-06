import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CallHistory({ type = 'user', end_time_of_call = '', start_time_of_call = '', dtmf_inputs = {} }) {
	const ICON_MAPPING = {
		user: {

			start      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disabled call.svg',
			end        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/call.svg',
			compStyles : { borderTopLeftRadius: '0px', background: '#FFFFFF' },
		},
		agent: {
			start : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/call hangup.svg',
			end   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/omni_channel.svg',

			compStyles: { borderTopRightRadius: '0px', background: '#FFFCE6' },
		},
	};
	const startTime = start_time_of_call?.split(' ')?.[1];
	const endTime = end_time_of_call?.split(' ')?.[1];
	const { start = '', end = '', compStyles = {} } = ICON_MAPPING[type] || {};

	const conditionCheck = !isEmpty(dtmf_inputs) && type === 'user';

	const dtmfOptions = Object.entries(dtmf_inputs || {})?.map(([key, value]) => ({ key, value }));

	return (
		<div>

			<div className={styles.started} style={compStyles}>
				<img src={start} alt="logo" />
				<div className={styles.padding}>
					<div>
						Audio call started
					</div>
					<div>
						{startTime}
					</div>
				</div>
			</div>

			<div className={styles.ended_call_div}>
				<div className={styles.ended_call} style={compStyles}>
					<img src={end} alt="logo" />
					<div className={styles.padding}>
						<div>
							Audio call ended
						</div>
						<div>
							{endTime}
						</div>
					</div>
				</div>
				{conditionCheck && (
					<div className={styles.connected_ivr}>
						<div className={styles.purpose}>
							Connected to IVR
						</div>
						<div className={styles.info_icon}>
							<Tooltip
								content={(
									<div className={styles.ivr_details}>

										{(dtmfOptions || []).map((item) => {
											const { key = '', value = '' } = item;

											return (
												<div className={styles.details}>
													{startCase(key)}
													{' '}
													:
													{' '}
													{startCase(value)}

												</div>
											);
										})}
									</div>
								)}
								placement="bottom"
							>
								<IcMInfo fill="#615f5f" />
							</Tooltip>

						</div>
					</div>
				)}

			</div>

		</div>
	);
}
export default CallHistory;
