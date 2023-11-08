import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

let richTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require, import/no-unresolved
	richTextEditor = require('react-rte').default;
}

function QuestStringEditor({
	editor = '',
	setEditor = () => {},
	formattedString = {},
	handleResetString = () => {},
}) {
	const RichTextEditor = richTextEditor;

	const handleChange = (value) => {
		setEditor(value);
	};

	const onClickFill = () => {
		setEditor(RichTextEditor?.createValueFromString(formattedString?.value, 'html'));
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.generated_string_heading}>
					Quest string editor
				</div>
				<div className={styles.generate_button}>
					<Button
						disabled={isEmpty(formattedString?.value)}
						onClick={onClickFill}
					>
						Use Auto-generated
						{' '}

					</Button>

					<Button
						themeType="secondary"
						onClick={handleResetString}
					>
						Reset

					</Button>
				</div>
			</div>
			<RichTextEditor
				value={editor}
				onChange={handleChange}
				required
				id="body-text"
				name="bodyText"
				type="string"
				multiline
				variant="filled"
				rootStyle={{
					zIndex    : 0,
					position  : 'relative',
					minHeight : '300px',
				}}
			/>
		</div>
	);
}

export default QuestStringEditor;
