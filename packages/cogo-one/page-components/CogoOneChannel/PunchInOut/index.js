import { Button, cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDown, IcMArrowDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import useUpdateAgentWorkPreferences from '../../../hooks/UseUpdateAgentWorkPreferences';

import ShowMoreStats from './ShowMoreStats';
import styles from './styles.module.css';

function PunchInOut({
	fetchworkPrefernce = () => {},
	agentStatus = {},
	data = {},
	dateLoading = false,
	agentTimeline = () => {},
}) {
	const [showDetails, setShowDetails] = useState(false);

	const { status = '' } = agentStatus || {};

	const { list = [] } = data || {};

	const lastBreakTime = list?.[GLOBAL_CONSTANTS.zeroth_index]?.break_started_at;

	const {
		updateWorkPreference = () => {},
		loading = false,
	} = useUpdateAgentWorkPreferences({ fetchworkPrefernce, agentTimeline });

	const handlePunchIn = () => {
		updateWorkPreference({ type: 'punched_in' });
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.hide_stats_section} ${showDetails ? styles.show_stats_section : ''}`}>
				{showDetails && (
					<ShowMoreStats
						setShowDetails={setShowDetails}
						showDetails={showDetails}
						updateWorkPreference={updateWorkPreference}
						loading={loading}
						punchedTime={lastBreakTime}
						status={status}
						handlePunchIn={handlePunchIn}
					/>
				)}
			</div>

			<div
				role="presentation"
				className={styles.minimize_container}
				onClick={() => setShowDetails((prev) => !prev)}
			>
				<Image src={GLOBAL_CONSTANTS.image_url.sad_icon} alt="sad-emoji" width={18} height={18} />
				<div className={styles.break_time}>0</div>
				<IcMDown className={styles.down_icon} />
				{status === 'punched_out' ? (
					<Button size="xs" onClick={handlePunchIn} disabled={loading}>Start Shift</Button>
				) : (
					<>
						<Image src={GLOBAL_CONSTANTS.image_url.clock_icon} alt="clock" width={18} height={18} />
						<div className={styles.shift_time}>

							{dateLoading ? <Placeholder width="55px" height="18px" /> : formatDate({
								date       : lastBreakTime,
								formatType : 'dateTime',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							})}
						</div>
					</>
				)}
				<IcMArrowDown className={cl`${showDetails ? styles.up_arrow : styles.arrow_down}`} />
			</div>

		</div>
	);
}

export default PunchInOut;
