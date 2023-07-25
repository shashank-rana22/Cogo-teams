import { Popover, Select, Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function PopoverContent({
	loading = false,
	filteredOptions = [],
	prevtags = [],
	setIsVisible = () => {},
	updateChat = () => {},
}) {
	const [headertags, setheaderTags] = useState('');

	return (
		<div>
			<div className={styles.input_container}>
				<Select
					onChange={setheaderTags}
					value={loading ? '' : headertags}
					options={filteredOptions}
					placeholder="Select Tags"
				/>
			</div>
			<div className={styles.buttons_container}>
				<Button size="sm" themeType="tertiary" onClick={() => setIsVisible(false)}>
					reset
				</Button>
				<Button
					size="sm"
					themeType="accent"
					loading={loading}
					onClick={() => {
						updateChat({ tags: [headertags, ...(prevtags || [])] });
						setIsVisible(false);
					}}
				>
					submit
				</Button>
			</div>
		</div>
	);
}

function TagsPopOver({
	prevtags = [],
	updateChat = () => {},
	hasPermissionToEdit = false,
	tagOptions = [],
	loading = false,
}) {
	const [isVisible, setIsVisible] = useState(false);

	const filteredOptions = tagOptions.filter(
		({ value }) => !prevtags?.includes(value),
	);

	if (isEmpty(filteredOptions) || !hasPermissionToEdit) {
		return null;
	}

	return (
		<Popover
			placement="bottom"
			interactive
			render={(
				isVisible && (
					<PopoverContent
						loading={loading}
						filteredOptions={filteredOptions}
						prevtags={prevtags}
						setIsVisible={setIsVisible}
						updateChat={updateChat}
					/>
				)
			)}
			onClickOutside={() => setIsVisible(false)}
			visible={isVisible}
		>
			<div className={styles.flex}>
				<IcMPlusInCircle onClick={() => setIsVisible((p) => !p)} width={18} height={18} />
			</div>
		</Popover>
	);
}

export default TagsPopOver;
