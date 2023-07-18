import useMountNewRoomSnapShot from '../../../../hooks/useMountNewRoomSnapShot';
import Messages from '../Messages';

// import styles from './styles.module.css';

function NewUserRoom(props) {
	const { activeTab = {}, setActiveTab, firestore } = props;

	const { loading } = useMountNewRoomSnapShot({ activeTab, setActiveTab, firestore });
	console.log('loading', loading);

	return (
		<Messages {...props} />
	);
}
export default NewUserRoom;
