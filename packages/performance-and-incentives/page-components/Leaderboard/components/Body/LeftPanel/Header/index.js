import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header(props) {
	const { currLevel, setParams, isExpanded, setIsExpanded } = props;

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

	return (
		<>
			<h3 className={styles.heading}>
				Leaderboard
			</h3>

			<div className={styles.subheading}>
				<div>
					<span className={styles.light}>for</span>
					{' '}
					<i>Cogo India</i>
				</div>

				{currLevel[GLOBAL_CONSTANTS.zeroth_index] !== 'kam_report' ? (
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
