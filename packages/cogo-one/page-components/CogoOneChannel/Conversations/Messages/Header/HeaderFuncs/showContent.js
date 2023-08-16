import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import { TAGS_COLORS } from '../../../../../../constants';

import styles from './styles.module.css';

const MAX_SHOW_LENGTH = 2;
// const ONLY_ONE_TAG = 1;

function ToolTipContent({ moreList = [], handleRemoveTags = () => {} }) {
	return (
		<div className={styles.overflow_div}>
			{(moreList || []).map((item) => (
				<div
					className={cl`${styles.tags} ${styles.margin}`}
					key={item}
				>
					{startCase(item)}
					<IcMCross onClick={() => handleRemoveTags({ item })} className={styles.cross_icon} />
				</div>
			))}
		</div>
	);
}

function ToolTipComp({ moreList = [], handleRemoveTags = () => {} }) {
	return (
		<Tooltip
			content={(
				<ToolTipContent
					moreList={moreList}
					handleRemoveTags={handleRemoveTags}
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
	updateChat = () => {},
}) {
	const showMoreList = (list || []).length > MAX_SHOW_LENGTH;
	const lessList = (list || []).slice(GLOBAL_CONSTANTS.zeroth_index, MAX_SHOW_LENGTH);
	const moreList = (list || []).slice(MAX_SHOW_LENGTH);

	const handleRemoveTags = ({ item }) => {
		const updatedList = (list || []).filter((value) => value !== item);
		// const isOneTag = (list || []).length === ONLY_ONE_TAG;
		updateChat({ tags: (updatedList || []) });
	};

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
				? <ToolTipComp moreList={moreList} handleRemoveTags={handleRemoveTags} />
				: null}

			{(lessList || []).map(
				(item, index) => (
					<div
						className={styles.tags}
						style={{ background: TAGS_COLORS[index] }}
						key={item}
					>
						{startCase(item)}
						<IcMCross onClick={() => handleRemoveTags({ item })} className={styles.cross_icon} />
					</div>
				),
			)}

			{(showMoreList && showMorePlacement === 'right')
				? <ToolTipComp moreList={moreList} handleRemoveTags={handleRemoveTags} />
				: null}
		</div>
	);
}

export default ShowContent;
