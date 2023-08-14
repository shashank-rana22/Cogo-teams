import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import { TAGS_COLORS } from '../../../../../../constants';

import styles from './styles.module.css';

const MAX_SHOW_LENGTH = 2;

function ToolTipContent({ moreList = [] }) {
	return (
		<div className={styles.overflow_div}>
			{(moreList || []).map((item) => (
				<div
					className={cl`${styles.tags} ${styles.margin}`}
					key={item}
				>
					{startCase(item)}
				</div>
			))}
		</div>
	);
}

function ToolTipComp({ moreList = [] }) {
	return (
		<Tooltip
			content={(
				<ToolTipContent
					moreList={moreList}
				/>
			)}
			theme="light"
			placement="bottom"
			interactive
		>
			<div className={styles.more_tags}>
				+
				{moreList?.length}
			</div>
		</Tooltip>
	);
}

function ShowContent({
	list = [],
	showMorePlacement = 'right',
	hasPermissionToEdit = false,
}) {
	const showMoreList = (list || []).length > MAX_SHOW_LENGTH;
	const lessList = (list || []).slice(GLOBAL_CONSTANTS.zeroth_index, MAX_SHOW_LENGTH);
	const moreList = (list || []).slice(MAX_SHOW_LENGTH);

	if (isEmpty(list)) {
		return (
			<div className={styles.tags_text}>
				{hasPermissionToEdit &&	'Add tags to categorise chats'}
			</div>
		);
	}

	return (
		<div className={styles.flex_container_add}>
			{(showMoreList && showMorePlacement !== 'right')
				? <ToolTipComp moreList={moreList} />
				: null}

			{(lessList || []).map(
				(item, index) => (
					<div
						className={styles.tags}
						style={{ background: TAGS_COLORS[index] }}
						key={item}
					>
						{startCase(item)}
					</div>
				),
			)}

			{(showMoreList && showMorePlacement === 'right')
				? <ToolTipComp moreList={moreList} />
				: null}
		</div>
	);
}

export default ShowContent;
