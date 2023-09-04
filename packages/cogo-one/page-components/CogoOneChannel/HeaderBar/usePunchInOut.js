import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useCallback } from 'react';

import useUpdateAgentWorkPreferences from '../../../hooks/UseUpdateAgentWorkPreferences';

const BUTTON_SHAKE_DURATION = 300000;

function usePunchInOut({
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	firestore = {},
	userId = '',
	data = {},
	agentStatus = {},
}) {
	const [isShaking, setIsShaking] = useState(false);

	const {
		updateWorkPreference = () => {},
		loading = false,
	} = useUpdateAgentWorkPreferences({
		fetchworkPrefernce,
		agentTimeline,
		setIsShaking,
		firestore,
		userId,
	});

	const { list = [] } = data || {};
	const { status = '' } = agentStatus || {};

	const lastBreakTime = list?.[GLOBAL_CONSTANTS.zeroth_index]?.break_started_at;

	const shakeButton = useCallback(() => {
		setIsShaking(true);
		const timerFunction = setTimeout(() => {
			setIsShaking(false);
		}, BUTTON_SHAKE_DURATION);

		return () => clearTimeout(timerFunction);
	}, []);

	const handlePunchIn = (event) => {
		event.stopPropagation();
		updateWorkPreference({ type: 'punched_in' });
	};

	const handlePunchOut = (event) => {
		event.stopPropagation();
		updateWorkPreference({ type: 'punched_out' });
	};

	return {
		updateWorkPreference,
		loading,
		lastBreakTime,
		status,
		handlePunchIn,
		isShaking,
		setIsShaking,
		shakeButton,
		handlePunchOut,
	};
}

export default usePunchInOut;
