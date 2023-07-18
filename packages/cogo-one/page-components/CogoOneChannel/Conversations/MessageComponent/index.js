import Messages from '../Messages';
import NewUserRoom from '../NewUserRoom';

function MessageComponent(props = {}) {
	const { activeTab } = props;
	const { hasNoFireBaseRoom = false } = activeTab || {};

	const Component = hasNoFireBaseRoom ? NewUserRoom : Messages;

	return (
		<Component {...props} />
	);
}
export default MessageComponent;
