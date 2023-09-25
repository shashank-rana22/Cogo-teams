import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../constants/leaderboard-viewtype-constants';
import getEntityNameById from '../../../../../../utils/get-entity-name-by-id';

import styles from './styles.module.css';

const { ADMIN, OWNER } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const MIN_LENGTH = 1;

function Header(props) {
	const { currLevel, setParams, isExpanded, setIsExpanded, entity, levelStack } = props;

	const { incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);

	const handleClick = () => {
		setIsExpanded((prev) => !prev);

		setParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				report_type : isExpanded ? currLevel[GLOBAL_CONSTANTS.zeroth_index] : 'kam_report',
				user_rm_ids : currLevel[GLOBAL_CONSTANTS.one] ? [currLevel[GLOBAL_CONSTANTS.one]] : undefined,
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

				{(incentive_leaderboard_viewtype === ADMIN
				|| (incentive_leaderboard_viewtype === OWNER && levelStack?.length === MIN_LENGTH)) ? (
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
