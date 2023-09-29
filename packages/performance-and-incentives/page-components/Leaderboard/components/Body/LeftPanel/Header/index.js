import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../constants/leaderboard-viewtype-constants';
import getLeftPanelHeading from '../../../../helpers/getLeftPanelHeading';

import styles from './styles.module.css';

const { AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;
const { ADMIN, OWNER } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const MIN_LENGTH = 1;

function Header(props) {
	const { params, setParams, levelStack, currLevel, isExpanded, setIsExpanded, entity } = props;

	const { incentive_leaderboard_viewtype, auth_role_data: selfRoleData } = useSelector(({ profile }) => profile);

	const [reportDetails, setReportDetails] = useState({});

	const handleClick = () => {
		setIsExpanded((prev) => !prev);

		if (!isExpanded) {
			setReportDetails({
				report_type      : params.filters?.report_type || undefined,
				report_view_type : params.filters?.report_view_type || undefined,
			});
		} else setReportDetails({});

		setParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				...(!isExpanded ? { report_type: AGENT_REPORT, report_view_type: 'kam_wise' } : reportDetails),
			},
		}));
	};

	const HEADING = getLeftPanelHeading({ currLevel, entity, viewType: incentive_leaderboard_viewtype, selfRoleData });

	return (
		<>
			<h3 className={styles.heading}>
				Leaderboard
			</h3>

			<div className={styles.subheading}>
				<div>
					<span className={styles.light}>for</span>
					{' '}
					<i>{HEADING}</i>
				</div>

				{((incentive_leaderboard_viewtype === ADMIN
				|| (incentive_leaderboard_viewtype === OWNER && levelStack?.length === MIN_LENGTH))
				&& (currLevel.report_type !== AGENT_REPORT)) ? (
					<Button size="md" themeType="linkUi" onClick={handleClick}>
						{isExpanded ? 'Collapse' : 'Expand All'}
						{' '}
						<IcMArrowRight width={16} height={16} />
					</Button>
					) : null}
			</div>
		</>
	);
}

export default Header;
