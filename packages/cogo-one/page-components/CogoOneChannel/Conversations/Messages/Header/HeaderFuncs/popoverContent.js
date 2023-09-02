import { Select, Button } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function PopoverContent({
	loading = false,
	filteredOptions = [],
	prevTags = [],
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
						updateChat({
							tags   : [headertags, ...(prevTags || [])],
							action : 'tags_changed',
							reason : headertags === 'important' ? 'added Important Tag' : '',
						});
						setIsVisible(false);
					}}
				>
					submit
				</Button>
			</div>
		</div>
	);
}

export default PopoverContent;
