import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import AssigneeAvatar from '../../../../../../common/AssigneeAvatar';

import styles from './styles.module.css';

const MAX_SHOW_LENGTH = 2;

function ToolTipContent({ moreList = [] }) {
	return (
		<div>
			{(moreList || []).map(({ agent_name: prevAssignedName = '' }) => (
				<div className={styles.name} key={prevAssignedName}>
					{prevAssignedName}
				</div>
			))}
		</div>
	);
}

function ToolTipComp({ moreList = [] }) {
	return (
		<Tooltip
			content={<ToolTipContent moreList={moreList} />}
			theme="light"
			placement="bottom"
		>
			<div className={styles.more_tags}>
				{moreList?.length}
				+
			</div>
		</Tooltip>
	);
}

function Assignes({ filteredSpectators = [] }) {
	const showMoreList = (filteredSpectators || []).length > MAX_SHOW_LENGTH;
	const lessList = (filteredSpectators || []).slice(GLOBAL_CONSTANTS.zeroth_index, MAX_SHOW_LENGTH);
	const moreList = (filteredSpectators || []).slice(MAX_SHOW_LENGTH);

	return (
		<div className={styles.flex_container_add}>
			{showMoreList && <ToolTipComp moreList={moreList} />}

			{(lessList || []).map(
				({ agent_name: prevAssignedName = '' }) => (
					<AssigneeAvatar
						name={prevAssignedName}
						type="disabled"
						key={prevAssignedName}
					/>
				),
			)}
		</div>
	);
}

export default Assignes;
