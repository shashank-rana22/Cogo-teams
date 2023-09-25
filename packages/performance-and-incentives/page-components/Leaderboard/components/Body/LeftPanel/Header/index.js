import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../constants/leaderboard-viewtype-constants';
import getEntityNameById from '../../../../../../utils/get-entity-name-by-id';

import styles from './styles.module.css';

const { ADMIN, OWNER } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const MIN_LENGTH = 1;

function Header(props) {
	const { params, currLevel, setParams, isExpanded, setIsExpanded, entity, levelStack } = props;
	const { incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);
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
				...(!isExpanded ? { report_type: 'kam_report', report_view_type: 'kam_wise' } : reportDetails),
			},
		}));
	};

	const COGO_ENTITY = getEntityNameById(entity);

	return (
		<>
			<h3 className={styles.heading}>
				Leaderboard
			</h3>

			<div className={styles.subheading}>
				<div>
					<span className={styles.light}>for</span>
					{' '}
					<i>{COGO_ENTITY}</i>
				</div>

				{((incentive_leaderboard_viewtype === ADMIN
				|| (incentive_leaderboard_viewtype === OWNER && levelStack?.length === MIN_LENGTH))
				&& (currLevel[GLOBAL_CONSTANTS.zeroth_index] !== 'kam_report')) ? (
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
