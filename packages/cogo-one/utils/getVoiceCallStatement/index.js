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

const getVoiceCallStatement = ({ type = '', present = '', previous = '', startAt = null, voiceCallStatus = '' }) => {
	switch (type) {
		case 'assigned':
			if (startAt === null) {
				return `${previous} assigned this chat as spectator to ${present}`;
			}
			return `${previous} assigned this chat to ${present}`;
		case 'escalate':
			return `This chat has been escalated to ${present}`;
		case 'closed':
			return `This chat has been closed by ${previous}`;
		case 'assign_to_me':
			return `${previous} assigned this chat to himself`;
		case 'auto_assign':
			return `This chat is auto assigned to ${present}`;
		case 'requested_to_chat':
			return `${previous} requested ${present} to assign this chat`;
		case 'outgoing':
		case 'incoming':
			return getVoiceCallStatus({ type, status: voiceCallStatus, present, previous });
		default:
			return null;
	}
};
export default getVoiceCallStatement;
