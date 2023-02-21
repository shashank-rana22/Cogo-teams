import { Tooltip, cl, Popover, Select, Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty, snakeCase } from '@cogoport/utils';

// import tagsOptions from '../../../../../../configurations/tags-options';
import { TAGS_COLORS } from '../../../../../../constants';

import styles from './styles.module.css';

export function ShowContent({ list = [], showMorePlacement = 'right' }) {
	const MAX_SHOW_LENGTH = 3;
	const showMoreList = (list || []).length > MAX_SHOW_LENGTH;
	const lessList = (list || []).slice(0, MAX_SHOW_LENGTH);
	const moreList = (list || []).slice(MAX_SHOW_LENGTH);

	const toolTipContent = (
		<div>
			{(moreList || []).map((item) => (
				<div
					className={cl`${styles.tags} ${styles.margin}`}
					key={snakeCase(item)}
				>
					{item}
				</div>
			))}
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
	if (isEmpty(list)) {
		return (
			<div className={styles.tags_text}>
				Add tags to categorise chats
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
					{item}
				</div>
			))}
			{showMoreList && showMorePlacement === 'right' && toolTipComp}
		</div>
	);
}

export function TagsPopOver({
	prevtags = [],
	setheaderTags = () => {},
	headertags = '',
	isVisible,
	setIsVisible = () => {},
	updateChat = () => {},
	hasPermissionToEdit = false,
	tagOptions = [],
}) {
	const filteredOptions = tagOptions.filter(
		({ value }) => !prevtags.includes(value),
	);
	const resetFunc = () => {
		setheaderTags('');
		setIsVisible(false);
	};
	const popOverContent = (
		<div>
			<div className={styles.input_container}>
				<Select
					onChange={(e) => setheaderTags(e)}
					value={headertags}
					options={filteredOptions}
					placeholder="Select Tags"
				/>
			</div>
			<div className={styles.buttons_container}>
				<Button size="sm" themeType="tertiary" onClick={resetFunc}>
					reset
				</Button>
				<Button
					size="sm"
					themeType="accent"
					onClick={() => {
						updateChat({ tags: [headertags, ...(prevtags || [])] });
						setIsVisible(false);
						resetFunc();
					}}
				>
					submit
				</Button>
			</div>
		</div>
	);
	if (isEmpty(filteredOptions) || !hasPermissionToEdit) {
		return null;
	}
	return (
		<Popover
			placement="bottom"
			interactive
			render={popOverContent}
			onClickOutside={resetFunc}
			visible={isVisible}
		>
			<div className={styles.flex}>
				<IcMPlusInCircle onClick={() => setIsVisible((p) => !p)} />
			</div>
		</Popover>
	);
}
