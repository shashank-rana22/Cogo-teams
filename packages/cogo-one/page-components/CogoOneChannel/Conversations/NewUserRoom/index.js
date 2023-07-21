import useMountNewRoomSnapShot from '../../../../hooks/useMountNewRoomSnapShot';
import Messages from '../Messages';

function NewUserRoom(props) {
	const { activeTab = {}, setActiveTab, firestore } = props;

	const { loading } = useMountNewRoomSnapShot({ activeTab, setActiveTab, firestore });

	return (
		<Messages {...props} newUserRoomLoading={loading} />
	);
}
export default NewUserRoom;
