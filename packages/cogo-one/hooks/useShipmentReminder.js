import {
	doc,
	onSnapshot,
} from 'firebase/firestore';
import { useRef, useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

import useListCheckouts from './useListCheckouts';

const THREE_HOURS = 3;
const MINUTES_IN_ONE_HOUR = 60;
const SECONDS_IN_ONE_MIN = 60;
const MILLISECS_IN_ONE_SEC = 1000;
const DEFAULT_TIMER = 0;
const THREE_HOURS_IN_MILLISECONDS = THREE_HOURS * MINUTES_IN_ONE_HOUR * SECONDS_IN_ONE_MIN * MILLISECS_IN_ONE_SEC;

function useShipmentReminder({
	firestore,
	setReminderModal = () => {},
	agentId = '',
}) {
	const shipmentReminderSnapShotRef = useRef(null);
	const remindertimeoutRef = useRef(null);
	const {
		shipmentData,
		getAgentShipmentsCount = () => {},
	} = useListCheckouts({ setReminderModal, agentId });

	const mountReminderSnapShot = useCallback(async () => {
		shipmentReminderSnapShotRef?.current?.();

		try {
			const roomDoc = doc(
				firestore,
				`${FIRESTORE_PATH.agent_data}/${agentId}`,
			);

			shipmentReminderSnapShotRef.current = onSnapshot(roomDoc, (roomDocData) => {
				const { last_reminder = 0 } = roomDocData.data() || {};

				const differenceFromLastReminder = Date.now() - last_reminder;
				const timer = differenceFromLastReminder > THREE_HOURS_IN_MILLISECONDS
					? DEFAULT_TIMER : THREE_HOURS_IN_MILLISECONDS - differenceFromLastReminder;

				clearTimeout(remindertimeoutRef?.current);

				remindertimeoutRef.current = setTimeout(() => {
					getAgentShipmentsCount({ roomDoc, type: 'update', firestore });
				}, timer);
			});
		} catch (e) {
			console.log('e:', e);
		}
	}, [agentId, firestore, getAgentShipmentsCount]);

	const cleanUpTimeout = useCallback(() => {
		shipmentReminderSnapShotRef?.current?.();
		clearTimeout(remindertimeoutRef?.current);
	}, []);

	return { mountReminderSnapShot, cleanUpTimeout, shipmentData };
}

export default useShipmentReminder;
