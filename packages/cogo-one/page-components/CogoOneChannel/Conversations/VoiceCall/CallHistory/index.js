import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import { CALL_HISTORY_AUDIO_ICONS } from '../../../../../constants';

import styles from './styles.module.css';

const COUNT_ONE = 1;

function CallHistory({
	type = 'user',
	end_time_of_call = '', start_time_of_call = '', dtmf_inputs = {}, channelType = '',
}) {
	const startTime = start_time_of_call?.split(' ')?.[COUNT_ONE];
	const endTime = end_time_of_call?.split(' ')?.[COUNT_ONE];
	const { start = '', end = '', compStyles = {} } = CALL_HISTORY_AUDIO_ICONS[type] || {};

	const conditionCheck = !isEmpty(dtmf_inputs) && type === 'user';

	const dtmfOptions = Object.entries(dtmf_inputs || {})?.map(([key, value]) => ({ key, value }));

	const isVideoCall = channelType === 'video_call';
	const callStartedMessage = isVideoCall ? 'Video call started' : 'Audio call started';
	const callEndedMessage = isVideoCall ? 'Video call ended' : 'Audio call ended';

	return (
		<div>

			<div className={styles.started} style={compStyles}>
				<img src={start} alt="logo" />
				<div className={styles.padding}>
					<div>
						{callStartedMessage}
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
							{callEndedMessage}
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
												<div className={styles.details} key={key}>
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
