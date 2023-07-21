import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { CALL_ANALYTICS_STATS } from '../../configurations/call-analytic-data';

import CallTypeStats from './CallTypeStats';
import Header from './Header';
import styles from './styles.module.css';

function CallAnalytics({ loading = false, callsAnalytics = {} }) {
	const {
		incoming_answered = 0,
		incoming_missed = 0,
		outgoing_answered = 0,
		outgoing_missed = 0,
	} = callsAnalytics[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { calls = [], channel = [] } = CALL_ANALYTICS_STATS || {};

	const missedSum = incoming_missed + outgoing_missed;

	const formatData = {
		incoming_answered,
		outgoing_answered,
		missed_calls: missedSum,
	};

	return (
		<div className={styles.statistics}>
			<div className={styles.heading}>Calls Analytics</div>
			<Header calls={calls} loading={loading} callsAnalytics={callsAnalytics} />
			<CallTypeStats loading={loading} channel={channel} formatData={formatData} />
		</div>
	);
}
export default CallAnalytics;
