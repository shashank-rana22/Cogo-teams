import { Tooltip } from '@cogoport/components';

import AssigneeAvatar from '../../../../../../common/AssigneeAvatar';
import styles from '../HeaderFuncs/styles.module.css';

function Assignes({ filteredSpectators = [] }) {
	const MAX_SHOW_LENGTH = 2;
	const showMoreList = (filteredSpectators || []).length > MAX_SHOW_LENGTH;
	const lessList = (filteredSpectators || []).slice(0, MAX_SHOW_LENGTH);
	const moreList = (filteredSpectators || []).slice(MAX_SHOW_LENGTH);

	const toolTipContent = (
		<div>
			{(moreList || []).map(({ agent_name:prevAssignedName = '' }) => (
				<div className={styles.name}>{prevAssignedName}</div>
			))}
		</div>
	);

	const toolTipComp = (
		<Tooltip content={toolTipContent} theme="light" placement="bottom">
			<div className={styles.more_tags}>
				{moreList?.length}
				+
			</div>
		</Tooltip>
	);

	return (
		<div className={styles.flex}>
			{showMoreList && toolTipComp}
			{(lessList || []).map(({ agent_name:prevAssignedName = '' }) => (
				<AssigneeAvatar
					name={prevAssignedName}
					type="disabled"
					key={prevAssignedName}
				/>
			))}
		</div>
	);
}

export default Assignes;
