import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

function TimelineContent({
	showTimer = false,
	showEndButton = false,
	lastBreakTime,
	formatTime,
	countdown,
	handlePunchOut,
}) {
	switch (true) {
		case showTimer:
			return <div>{formatTime(countdown)}</div>;

		case showEndButton:
			return (
				<Button size="xs" onClick={handlePunchOut}>
					End
				</Button>
			);
		default:
			return (
				<div>
					{formatDate({
						date       : lastBreakTime,
						formatType : 'dateTime',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					})}
				</div>

			);
	}
}

export default TimelineContent;
