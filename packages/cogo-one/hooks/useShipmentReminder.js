import { useSelector } from '@cogoport/store';
import {
	collection,
	addDoc,
	query,
	where,
	limit,
	getDocs,
	doc,
	onSnapshot,
} from 'firebase/firestore';
import { useEffect } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

import useGetShipmentNumber from './useGetShipmentNumber';

const hours = 10800000;
const useShipmentReminder = ({ firestore, setReminderModal = () => {} }) => {
	const { user:{ id } } = useSelector(({ profile }) => profile);

	const {
		// data,
		getAgentShipmentNumber = () => {},
	} = useGetShipmentNumber({});

	// const { total_count: target } = data || {};

	const shipmentReminderRoom = collection(firestore, FIRESTORE_PATH.shipment_reminder);

	const roomsQuery = query(
		shipmentReminderRoom,
		where('agent_id', '==', id),
		limit(1),
	);

	const createRoom = async () => {
		const newRoom = {
			agent_id   : id,
			last_login : Date.now(),
		};

		const roomid = await addDoc(shipmentReminderRoom, newRoom);
		return { roomId: roomid?.id };
	};

	const createRoomIfNotExists = async () => {
		const docs = await getDocs(roomsQuery);
		if (!docs.size) {
			const roomId = createRoom();
			return { roomId };
		}
		return { roomId: docs?.docs?.[0]?.id };
	};

	const func = async () => {
		const { roomId } = await createRoomIfNotExists();

		const agent = doc(
			firestore,
			`${FIRESTORE_PATH.shipment_reminder}/${roomId}`,
		);

		onSnapshot(agent, (querySnapshot) => {
			const { last_login = '' } = querySnapshot.data() || {};

			const time_stamp = Date.now() - last_login;
			const time_interval = time_stamp >= hours ? 0 : hours - time_stamp;

			setTimeout(() => {
				getAgentShipmentNumber(roomId, setReminderModal);
			}, time_interval);
		});
	};

	useEffect(() => {
		func();
		return () => clearTimeout();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [];
};

export default useShipmentReminder;
