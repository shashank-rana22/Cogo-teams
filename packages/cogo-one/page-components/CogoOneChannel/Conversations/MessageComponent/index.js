import KamUserMessages from '../KamUserMessages';
import Messages from '../Messages';

const COMPONENT_MAPPING = {
	all         : Messages,
	kamContacts : KamUserMessages,
	default     : Messages,
};

function MessageComponent(props = {}) {
	const { activeTab } = props;
	const { subTab } = activeTab || {};

	const Component = COMPONENT_MAPPING[subTab] || COMPONENT_MAPPING.default;
	return (
		<Component {...props} />
	);
}
export default MessageComponent;
