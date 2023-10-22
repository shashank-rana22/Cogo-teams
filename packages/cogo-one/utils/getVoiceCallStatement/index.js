import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import { SHOW_LOG_STATUS_ICON_MAPPING, ICON_MAPPING } from '../../constants';

import styles from './styles.module.css';

function VoiceCallStatus({ type = '', status = '', present = '', previous = '', channel = '' }) {
	const statementMapping = {
		incoming : `${startCase(present)} got incoming call from ${startCase(previous)}`,
		outgoing : `${startCase(present)} called ${startCase(previous)}`,
	};

	const VideoCallIcon = SHOW_LOG_STATUS_ICON_MAPPING[status]?.icon || null;
	const videoCallIconColor = SHOW_LOG_STATUS_ICON_MAPPING[status]?.fill || '#fff';

	return (
		<div className={styles.flex}>
			{(channel === 'video_call' && VideoCallIcon) ? (
				<VideoCallIcon
					width={20}
					height={20}
					className={styles.video_call_icon}
					fill={videoCallIconColor}
				/>
			) : (
				<Image
					src={ICON_MAPPING[status === 'missed' ? 'missed' : type]}
					alt="call_status"
					width={15}
					height={15}
					className={styles.img_styles}
				/>
			) }
			<div>{statementMapping[type] || ''}</div>
		</div>
	);
}

const getStatementMapping = ({
	previous = '',
	present = '',
	voiceCallStatus = '',
	type = '',
	channel = '',
	reason = '',
	isSameAgent = false,
}) => ({
	escalate          : `This chat has been escalated to ${present}`,
	closed            : `This chat has been closed by ${previous}`,
	assign_to_me      : `${previous} assigned this chat to themself`,
	auto_assign       : `This chat is auto assigned to ${present}`,
	requested_to_chat : `${previous} requested ${present} to assign this chat`,
	outgoing          : (<VoiceCallStatus
		type={type}
		status={voiceCallStatus}
		present={present}
		previous={previous}
		channel={channel}
	/>),
	incoming: (<VoiceCallStatus
		type={type}
		status={voiceCallStatus}
		present={present}
		previous={previous}
		channel={channel}
	/>),
	request_to_join_group : `${previous} requested to join this group`,
	added_to_group        : isSameAgent ? `${previous} joined the group` : `${previous} added ${present} to this group`,
	leaving_the_group     : isSameAgent
		? `${previous} left the group` : `${previous} removed ${present} from  this group`,
	rejected_from_group     : `${previous} rejected ${present}'s request to join this group`,
	request_dissmissed      : `${previous} rejected ${present}'s request to tranfer chat`,
	organization_switch     : `${previous} changed organization from ${reason}`,
	tag_changed             : `${previous} has ${reason}`,
	request_dismissed       : `${previous} dismissed ${present}'s request for transfer chat`,
	owner_added_to_group    : `${previous} added ${present} as owner`,
	owner_leaving_the_group : `${previous} removed ${present} as owner`,
	group_name_changed      : `${previous} changed group name from ${reason}`,
	group_created           : `${previous} created this group`,
});

const getVoiceCallStatement = ({
	type = '',
	present = '',
	previous = '',
	startAt = null,
	voiceCallStatus = '',
	channel = '',
	reason = '',
	isSameAgent = false,
}) => {
	if (type === 'assigned') {
		if (startAt === null) {
			return `${previous} assigned this chat as spectator to ${present}`;
		}
		return `${previous} assigned this chat to ${present}`;
	}

	const statementMapping = getStatementMapping({
		previous,
		present,
		voiceCallStatus,
		type,
		channel,
		reason,
		isSameAgent,
	});

	return statementMapping?.[type] || '';
};

export default getVoiceCallStatement;
