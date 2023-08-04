import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';

import { CALL_HISTORY_AUDIO_ICONS } from '../../constants';

import styles from './styles.module.css';

function CallHistory({
	type = 'user', endTimeOfCall = '', startTimeOfCall = '', dtmfInputs = {},
	channelType = '',
}) {
	const startTime = startTimeOfCall ? formatDate({
		date       : new Date(startTimeOfCall),
		dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		formatType : 'time',
	}) : '';

	const endTime = endTimeOfCall ? formatDate({
		date       : new Date(endTimeOfCall),
		dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		formatType : 'time',
	}) : '';

	const { start = '', end = '', compStyles = {} } = CALL_HISTORY_AUDIO_ICONS[type] || {};

	const conditionCheck = !isEmpty(dtmfInputs) && type === 'user';

	const dtmfOptions = Object.entries(dtmfInputs || {})?.map(([key, value]) => ({ key, value }));

	const isVideoCall = channelType === 'video_call';
	const callStartedMessage = isVideoCall ? 'Video call started' : 'Audio call started';
	const callEndedMessage = isVideoCall ? 'Video call ended' : 'Audio call ended';

	return (
		<div>

			<div className={styles.started} style={compStyles}>
				<Image src={start} alt="logo" width={40} height={40} />
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
					<Image src={end} alt="logo" width={40} height={40} />
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
