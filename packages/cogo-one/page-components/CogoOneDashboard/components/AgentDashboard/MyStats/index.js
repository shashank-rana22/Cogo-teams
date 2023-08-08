import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { getFormattedNumber } from '../../../../../helpers/getFormattedNumber';
import useListAgentCheckout from '../../../hooks/useListAgentCheckout';

import styles from './styles.module.css';

const MIN_CALL_COUNT = 0;

function MyStats({
	timeline = '',
	calls = [],
	loading: callLoading = false,
}) {
	const {
		outgoing_missed = 0,
		outgoing_answered = 0,
		incoming_answered = 0,
		incoming_missed = 0,
	} = calls[GLOBAL_CONSTANTS.zeroth_index] || [];

	const totalCallMade = outgoing_missed + outgoing_answered;
	const totalCallreceive = incoming_answered + incoming_missed;
	const { shipmentData = {}, shipmentLoading = false } = useListAgentCheckout({ timeline });

	const { sales_dashboard_stats = {} } = shipmentData || {};
	const { booked = 0 } = sales_dashboard_stats || {};

	const loading = shipmentLoading || callLoading;

	return (
		<div className={styles.intent_served_box}>
			<div className={styles.stats_container}>
				<div className={styles.count}>
					{loading
						? <Placeholder width="60px" height="40px" className={styles.placeholder} />
						: (
							<div>
								{getFormattedNumber(booked) || MIN_CALL_COUNT}
							</div>
						)}
				</div>
				<div className={styles.title}>No. of Booking</div>
			</div>
			<div className={styles.stats_container}>
				<div className={styles.count}>
					{loading
						? <Placeholder width="60px" height="40px" className={styles.placeholder} />
						: (
							<div>
								{getFormattedNumber(totalCallMade) || MIN_CALL_COUNT}
							</div>
						)}
				</div>
				<div className={styles.title}>Calls Made</div>
			</div>
			<div className={styles.stats_container}>
				<div className={styles.count}>
					{loading
						? <Placeholder width="60px" height="40px" className={styles.placeholder} />
						: (
							<div>
								{getFormattedNumber(totalCallreceive) || MIN_CALL_COUNT}
							</div>
						)}
				</div>
				<div className={styles.title}>Calls Receive</div>
			</div>
		</div>
	);
}
export default MyStats;
