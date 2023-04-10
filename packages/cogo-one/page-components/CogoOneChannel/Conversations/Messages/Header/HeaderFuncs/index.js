import { Popover, Select, Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

function TagsPopOver({
	prevtags = [],
	setheaderTags = () => {},
	headertags = '',
	isVisible,
	setIsVisible = () => {},
	updateChat = () => {},
	hasPermissionToEdit = false,
	tagOptions = [],
	loading = false,
}) {
	const filteredOptions = tagOptions.filter(
		({ value }) => !prevtags?.includes(value),
	);
	const resetFunc = () => {
		setheaderTags(null);
		setIsVisible(false);
	};

	const popOverContent = (
		<div>
			<div className={styles.input_container}>
				<Select
					key={uuid()}
					onChange={(e) => setheaderTags(e)}
					value={loading ? '' : headertags}
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
					loading={loading}
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
	if (!isEmpty(filteredOptions) && hasPermissionToEdit) {
		return (
			<Popover
				placement="bottom"
				interactive
				render={popOverContent}
				onClickOutside={resetFunc}
				visible={isVisible}
			>
				<div className={styles.flex}>
					<IcMPlusInCircle onClick={() => setIsVisible((p) => !p)} width={18} height={18} />
				</div>
			</Popover>
		);
	}
}

export default TagsPopOver;
