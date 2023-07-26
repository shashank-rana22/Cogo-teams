import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDown, IcMArrowDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import useAgentWorkPrefernce from '../../../hooks/useAgentWorkPrefernce';
import useUpdateAgentWorkPreferences from '../../../hooks/UseUpdateAgentWorkPreferences';

import ShowMoreStats from './ShowMoreStats';
import styles from './styles.module.css';

const punchedTime = formatDate({
	date       : new Date(),
	formatType : 'time',
	dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
});

function PunchInOut() {
	const [showDetails, setShowDetails] = useState(false);

	const { agentStatus = {}, fetchworkPrefernce = () => {} } = useAgentWorkPrefernce();

	const { status = '' } = agentStatus || {};

	const {
		updateWorkPreference = () => {},
		loading = false,
	} = useUpdateAgentWorkPreferences({ fetchworkPrefernce });

	const handleClick = () => {
		updateWorkPreference({ type: 'punched_in' });
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.hide_div} ${showDetails ? styles.show_div : ''}`}>
				{showDetails && (
					<ShowMoreStats
						setShowDetails={setShowDetails}
						showDetails={showDetails}
						updateWorkPreference={updateWorkPreference}
						loading={loading}
						punchedTime={punchedTime}
						status={status}
						handleClick={handleClick}
					/>
				)}
			</div>

			<div
				role="presentation"
				className={styles.minimize_container}
				onClick={() => setShowDetails((prev) => !prev)}
			>
				<Image src={GLOBAL_CONSTANTS.image_url.sad_icon} alt="sad-emoji" width={18} height={18} />
				<div className={styles.break_time}>4.5</div>
				<IcMDown className={styles.down_icon} />
				{status === 'punched_out' ? (
					<Button size="xs" onClick={handleClick} disabled={loading}>Start Shift</Button>
				) : (
					<>
						<Image src={GLOBAL_CONSTANTS.image_url.clock_icon} alt="clock" width={18} height={18} />
						<div className={styles.shift_time}>
							{punchedTime}
						</div>
					</>
				)}
				<IcMArrowDown className={cl`${showDetails ? styles.up_arrow : styles.arrow_down}`} />
			</div>

		</div>
	);
}

export default PunchInOut;
