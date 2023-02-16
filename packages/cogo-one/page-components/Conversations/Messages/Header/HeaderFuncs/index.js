import { Tooltip, cl, Popover, Select, Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import tagsOptions from '../../../../../configurations/tags-options';
import { TAGS_COLORS } from '../../../../../constants';

import styles from './styles.module.css';

export const showContent = (list = [], showMorePlacement = 'right') => {
	const MAX_SHOW_LENGTH = 3;
	const showMoreList = (list || []).length > MAX_SHOW_LENGTH;
	const lessList = (list || []).slice(0, MAX_SHOW_LENGTH);
	const moreList = (list || []).slice(MAX_SHOW_LENGTH);

	const toolTipContent = (
		<div>
			{(moreList || []).map((item) => (<div className={cl`${styles.tags} ${styles.margin}`}>{item}</div>))}
		</div>
	);

	const toolTipComp = (
		<Tooltip content={toolTipContent} theme="light" placement="bottom">
			<div className={styles.more_tags}>
				+
				{moreList?.length}
			</div>
		</Tooltip>
	);

	return (
		<div className={styles.flex}>
			{showMoreList && showMorePlacement !== 'right' && toolTipComp}
			{(lessList || []).map((item, index) => (
				<div
					className={styles.tags}
					style={{ background: TAGS_COLORS[index] }}
				>
					{item}
				</div>
			))}
			{showMoreList && showMorePlacement === 'right' && toolTipComp}
		</div>
	);
};

export function TagsPopOver({ prevtags = [], setheaderTags = () => {}, headertags = '', updatetags = () => {} }) {
	const filteredOptions = tagsOptions.filter(({ value }) => !prevtags.includes(value));
	const resetFunc = () => setheaderTags('');
	const popOverContent = (
		<div>
			<div className={styles.input_container}>
				<Select onChange={(e) => setheaderTags(e)} value={headertags} options={filteredOptions} />
			</div>
			<div className={styles.buttons_container}>
				<Button size="sm" themeType="tertiary" onClick={resetFunc}>reset</Button>
				<Button
					size="sm"
					themeType="accent"
					onClick={() => updatetags([headertags, ...(prevtags || [])])}
				>
					submit

				</Button>
			</div>
		</div>
	);
	return (
		<Popover placement="bottom" interactive render={popOverContent} onClickOutside={resetFunc}>
			<IcMPlusInCircle />
		</Popover>
	);
}
