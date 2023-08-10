import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';
import { startCase, isEmpty } from '@cogoport/utils';

import { VOICE_ICON_MAPPING, SHOW_LOG_STATUS_ICON_MAPPING } from '../../../../constants';
import useGetVoiceCallList from '../../../../hooks/useGetVoiceCallList';
import dateTimeConverter from '../../../../utils/dateTimeConverter';
import LoadingState from '../LoadingState';

import EmptyCard from './EmptyCard';
import styles from './styles.module.css';

function VoiceList(voiceProps) {
	const {
		setActiveVoiceCard = () => {},
		activeVoiceCard = {},
		activeTab = '',
	} = voiceProps;

	const {
		loading,
		data = {},
		handleScroll = () => { },
	} = useGetVoiceCallList({ activeTab });

	const { list = [] } = data;

	const getCallStatus = (item) => {
		let status = '';
		const { call_status = '', call_type = '' } = item || {};
		if (call_status === 'answered' && call_type === 'outgoing') {
			status = 'outgoing';
		} else if (call_status === 'answered' && call_type === 'incoming') {
			status = 'incoming';
		} else if (isEmpty(call_status)) {
			status = call_type;
		} else {
			status = call_status;
		}
		return status;
	};

	if (isEmpty(list) && !loading) {
		return (
			<EmptyCard />
		);
	}

	return (
		<div
			className={styles.list_container}
			onScroll={(e) => handleScroll(e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight)}
		>
			{(list || []).map((item) => {
				const {
					user_data = null, user_number = '', organization_data = null,
					start_time_of_call = '', initiated_by = '',
					call_status: status = '', channel_type: channelType = '',
				} = item || {};

				const checkActiveCard = activeVoiceCard?.id === item?.id;
				const checkUserData = !isEmpty(user_data || {});

				const VideoCallIcon = SHOW_LOG_STATUS_ICON_MAPPING[status]?.icon || null;
				const videoCallIconColor = SHOW_LOG_STATUS_ICON_MAPPING[status]?.fill || '#fff';

				const callStatus = getCallStatus(item);

				const showUserData = checkUserData ? (
					startCase(user_data?.name)
				) : (
					user_number
				);
				const lastActive = new Date(start_time_of_call);

				return (
					<div
						key={item?.id}
						role="presentation"
						className={cl`
							${styles.card_container}
							${checkActiveCard ? styles.active_card : ''}
				 `}
						onClick={() => setActiveVoiceCard(item)}
					>
						<div className={styles.card}>
							<div className={styles.user_information}>
								<div className={styles.avatar_container}>
									<div className={styles.status_icons}>

										{channelType === 'video_call' ? (
											VideoCallIcon && (
												<VideoCallIcon
													width={20}
													height={20}
													className={styles.video_call_icon}
													fill={videoCallIconColor}
												/>
											)
										) : (
											<Image
												src={VOICE_ICON_MAPPING[callStatus] || ''}
												className={styles.avatar}
												alt="voice_icon"
												height={15}
												width={15}
											/>
										) }

										{callStatus === 'missed' && (
											<div className={styles.activity_duration}>
												{initiated_by === 'user'
													? 'by you' : 'by user'}
											</div>
										)}
									</div>
									<div className={styles.user_details}>
										<Tooltip content={showUserData} placement="top">
											<div className={styles.user_name}>
												{showUserData}
												{isEmpty(user_number) && '-'}
											</div>
										</Tooltip>

										<div className={styles.organisation}>

											{isEmpty(organization_data) ? '-' : (
												startCase(organization_data?.short_name)
											)}
										</div>
									</div>
								</div>

								<div className={styles.user_activity}>
									<div className={styles.activity_duration}>
										{!isEmpty(start_time_of_call) && (
											<div>
												{dateTimeConverter(
													Date.now() - Number(lastActive),
													Number(lastActive),
												)?.renderTime}
											</div>
										)}
									</div>
									<div className={styles.activity_duration}>
										{ start_time_of_call ? formatDate({
											date       : new Date(start_time_of_call),
											timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm a'],
											formatType : 'time',
										}) : ''}
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			{loading && <LoadingState />}
		</div>

	);
}

export default VoiceList;
