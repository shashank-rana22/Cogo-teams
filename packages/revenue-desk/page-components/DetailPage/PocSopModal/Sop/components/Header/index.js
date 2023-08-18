import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { header_container, label, value, last_update_details } from './styles.module.css';

function Header({
	setShowHistory = () => {},
	showHistory = false,
	auditsData = {},
}) {
	const { list = [] } = auditsData;

	const latestUpdate = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div className={header_container}>
			<div className={last_update_details}>
				<div>
					<span className={label}>Last Updated At:</span>
					<span className={value}>
						{formatDate({
							date       : latestUpdate?.updated_at,
							formatType : 'dateTime',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						})}
					</span>
				</div>

				<div>
					<span className={label}>Last Updated By:</span>
					<span className={value}>{latestUpdate?.performed_by_user?.name}</span>
				</div>
			</div>

			<Button themeType="linkUi" onClick={() => setShowHistory(!showHistory)}>
				{showHistory ? 'Exit' : 'View History'}
			</Button>
		</div>
	);
}

export default Header;
