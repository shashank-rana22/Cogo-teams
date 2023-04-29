/* eslint-disable max-len */
import React from 'react';

import styles from './styles.module.css';

function PopBody({ emojisList, updateMessage, setOnClicked = () => {} }) {
	return (
		<div className={styles.container}>
			{Object.entries(emojisList).map((group) => (
				Object.entries(group[1]).map((subgroup) => (
					subgroup[1].map((item) => {
						const result = item[0].trim().split(/\s+/);
						let emoji = '';
						result.forEach((emojiUnicode) => {
							emoji += String.fromCodePoint(`0x${emojiUnicode}`);
						});

						return (
							<div
								role="presentation"
								className={styles.emoji_button}
								onClick={() => {
									updateMessage(emoji);
									setOnClicked(false);
								}}
							>
								{emoji}
							</div>
						);
					})))))}
		</div>
	);
}

export default PopBody;
