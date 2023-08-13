import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';

import styles from '../styles.module.css';

function TimelineContent({
	showTimer = false,
	showEndButton = false,
	lastBreakTime = '',
	formatTime = () => {},
	countdown = 0,
	handlePunchOut = () => {},
	loading = false,
}) {
	switch (true) {
		case showTimer:
			return (
				<>
					<Image src={GLOBAL_CONSTANTS.image_url.clock_icon} alt="clock" width={18} height={18} />
					<div className={styles.time_title}>
						Your shift end in
						<span>{formatTime(countdown)}</span>
					</div>
				</>
			);

		case showEndButton:
			return (
				<Button size="xs" themeType="accent" disabled={loading} onClick={handlePunchOut}>
					End Shift
				</Button>
			);
		default:
			return (
				<>
					<Image src={GLOBAL_CONSTANTS.image_url.clock_icon} alt="clock" width={18} height={18} />
					<div className={styles.time_title}>
						{formatDate({
							date       : lastBreakTime,
							formatType : 'dateTime',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						})}
					</div>
				</>

			);
	}
}

export default TimelineContent;
