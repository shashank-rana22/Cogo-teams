import { Button } from '@cogoport/components';
import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../constants/leaderboard-viewtype-constants';
import getLeftPanelHeading from '../../../../helpers/getLeftPanelHeading';

import styles from './styles.module.css';

const { MANAGER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;
const { ADMIN, OWNER } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const MIN_LENGTH = 1;

function Header(props) {
	const { levelStack, setLevelStack, currLevel, setCurrLevel, entity } = props;

	const {
		incentive_leaderboard_viewtype: viewType,
		auth_role_data: selfRoleData,
	} = useSelector(({ profile }) => profile);

	const handleExpandAll = () => {
		setLevelStack((prevStack) => [currLevel, ...prevStack]);

		setCurrLevel((prevLevel) => ({
			...prevLevel,
			report_type : AGENT_REPORT,
			user        : {},
			isExpanded  : true,
		}));
	};

	const handleCollpase = () => {
		setLevelStack((prevStack) => {
			const notExpandedStack = prevStack.filter((level) => !level.isExpanded);

			const [actualCurrLevel, ...restStack] = notExpandedStack;

			setCurrLevel(actualCurrLevel);

			return restStack;
		});
	};

	const HEADING = getLeftPanelHeading({
		currLevel,
		entity,
		viewType,
		selfRoleData,
		levelStack,
	});

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

				{(!currLevel.isExpanded && (
					(viewType === ADMIN || (viewType === OWNER && levelStack?.length === MIN_LENGTH))
					&& (![MANAGER_REPORT, AGENT_REPORT].includes(currLevel.report_type)))) && (
						<Button type="button" size="md" themeType="linkUi" onClick={handleExpandAll}>
							Expand All
							{' '}
							<IcMArrowRight width={16} height={16} />
						</Button>
				)}

				{currLevel.isExpanded && (
					<Button type="button" size="md" themeType="linkUi" onClick={handleCollpase}>
						<IcMArrowLeft width={16} height={16} />
						{' '}
						Collapse
					</Button>
				)}
			</div>
		</>
	);
}

export default Header;
