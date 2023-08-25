import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import useGetCogoOneAgentStats from '../../../hooks/useGetOmniChannelStats';
import useUpdateAgentWorkPreferences from '../../../hooks/UseUpdateAgentWorkPreferences';

const BUTTON_SHAKE_DURATION = 300000;

function usePunchInOut({
	isPunchPresent = '',
	timePeriodValue = '',
	viewType = '',
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	firestore = {},
	userId = '',
	data = {},
	agentStatus = {},
}) {
	const [isShaking, setIsShaking] = useState(false);

	const {
		agentStatsLoading = false,
		agentStatsData = {},
	} = useGetCogoOneAgentStats({ isPunchPresent, timePeriodValue, viewType });

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

	const shakeButton = () => {
		setIsShaking(true);
		setTimeout(() => {
			setIsShaking(false);
		}, BUTTON_SHAKE_DURATION);
	};

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
		agentStatsLoading,
		agentStatsData,
		isShaking,
		setIsShaking,
		shakeButton,
		handlePunchOut,
	};
}

export default usePunchInOut;
