import { startCase } from '@cogoport/utils';

import { ICON_MAPPING } from '../../constants';

import styles from './styles.module.css';

const getVoiceCallStatus = ({ type, status, present, previous }) => {
	const statementMapping = {
		incoming : `${startCase(present)} got incoming call from ${startCase(previous)}`,
		outgoing : `${startCase(present)} called ${startCase(previous)}`,
	};

	return (
		<div className={styles.flex}>
			<img
				src={ICON_MAPPING[status === 'missed' ? 'missed' : type]}
				alt="call_status"
				className={styles.img_styles}
			/>
			<div>{statementMapping[type] || ''}</div>
		</div>
	);
};

const getStatementMapping = ({ previous, present, voiceCallStatus, type }) => ({
	escalate              : `This chat has been escalated to ${present}`,
	closed                : `This chat has been closed by ${previous}`,
	assign_to_me          : `${previous} assigned this chat to himself`,
	auto_assign           : `This chat is auto assigned to ${present}`,
	requested_to_chat     : `${previous} requested ${present} to assign this chat`,
	outgoing              : getVoiceCallStatus({ type, status: voiceCallStatus, present, previous }),
	incoming              : getVoiceCallStatus({ type, status: voiceCallStatus, present, previous }),
	request_to_join_group : `${previous} requested to join this group`,
	added_to_group        : `${previous} added ${present} to this group`,
	leaving_the_group     : `${previous} removed ${present} from  this group`,
	rejected_from_group   : `${previous} rejected ${present}'s request to join this group`,
	request_dissmissed    : `${previous} rejected ${present}'s request to tranfer chat`,
});

const getVoiceCallStatement = ({
	type = '',
	present = '',
	previous = '',
	startAt = null,
	voiceCallStatus = '',
}) => {
	if (type === 'assigned') {
		if (startAt === null) {
			return `${previous} assigned this chat as spectator to ${present}`;
		}
		return `${previous} assigned this chat to ${present}`;
	}

	const statementMapping = getStatementMapping({ previous, present, voiceCallStatus, type });

	return statementMapping?.[type] || '';
};

export default getVoiceCallStatement;
