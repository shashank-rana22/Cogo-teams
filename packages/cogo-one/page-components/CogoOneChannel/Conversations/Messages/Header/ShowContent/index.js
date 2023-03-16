import { Tooltip, cl } from '@cogoport/components';
import { isEmpty, snakeCase, startCase } from '@cogoport/utils';

import { TAGS_COLORS } from '../../../../../../constants';
import styles from '../HeaderFuncs/styles.module.css';

function ShowContent({ list = [], showMorePlacement = 'right', hasPermissionToEdit = false }) {
	const MAX_SHOW_LENGTH = 2;
	const showMoreList = (list || []).length > MAX_SHOW_LENGTH;
	const lessList = (list || []).slice(0, MAX_SHOW_LENGTH);
	const moreList = (list || []).slice(MAX_SHOW_LENGTH);

	const toolTipContent = (
		<div className={styles.overflow_div}>
			{(moreList || []).map((item) => (
				<div
					className={cl`${styles.tags} ${styles.margin}`}
					key={snakeCase(item)}
				>
					{startCase(item)}
				</div>
			))}
		</div>
	);

	const toolTipComp = (
		<Tooltip content={toolTipContent} theme="light" placement="bottom" interactive>
			<div className={styles.more_tags}>
				+
				{moreList?.length}
			</div>
		</Tooltip>
	);
	if (isEmpty(list)) {
		return (
			<div className={styles.tags_text}>
				{hasPermissionToEdit &&	'Add tags to categorise chats'}
			</div>
		);
	}

	return (
		<div className={styles.flex}>
			{showMoreList && showMorePlacement !== 'right' && toolTipComp}
			{(lessList || []).map((item, index) => (
				<div
					className={styles.tags}
					style={{ background: TAGS_COLORS[index] }}
					key={snakeCase(item)}
				>
					{startCase(item)}
				</div>
			))}
			{showMoreList && showMorePlacement === 'right' && toolTipComp}
		</div>
	);
}

export default ShowContent;
