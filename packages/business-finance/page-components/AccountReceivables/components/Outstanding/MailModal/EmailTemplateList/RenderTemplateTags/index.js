import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const MAX_SHOW_LENGTH = 2;

const TAGS_COLORS = ['#FEF3E9', '#F3FAFA'];

function ToolTipContent({ moreList = [] }) {
	return (
		<div className={styles.overflow_div}>
			{(moreList || []).map((item) => (
				<Pill size="sm" color="green" key={item}>{startCase(item)}</Pill>
			))}
		</div>
	);
}

function ToolTipComp({ moreList = [] }) {
	return (
		<Tooltip
			content={(
				<ToolTipContent moreList={moreList} />
			)}
			theme="light"
			placement="bottom"
			interactive
		>
			<div className={styles.more_tags}>
				+
				{' '}
				{moreList?.length}
			</div>
		</Tooltip>
	);
}

function RenderTemplateTags({ tags = [] }) {
	const showMoreList = (tags || []).length > MAX_SHOW_LENGTH;
	const lessList = (tags || []).slice(GLOBAL_CONSTANTS.zeroth_index, MAX_SHOW_LENGTH);
	const moreList = (tags || []).slice(MAX_SHOW_LENGTH);

	return (
		<div className={styles.tag_container}>
			{(lessList || []).map(
				(item, index) => (
					<Tooltip content={startCase(item)} placement="top" key={item}>
						<div
							className={styles.tags}
							style={{ background: TAGS_COLORS[index] }}
						>
							<div className={styles.label}>{startCase(item)}</div>
						</div>
					</Tooltip>
				),
			)}

			{showMoreList
				? <ToolTipComp moreList={moreList} />
				: null}
		</div>
	);
}

export default RenderTemplateTags;
