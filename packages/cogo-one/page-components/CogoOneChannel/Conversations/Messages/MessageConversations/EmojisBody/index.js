import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const EMOJI_NAME_INDEX = 2;

function PopBody({
	emojisList = {},
	updateMessage = () => {},
	setOnClicked = () => {},
}) {
	return (
		<div className={styles.container}>
			{Object.values(emojisList).map(
				(group) => (
					Object.values(group).map(
						(subgroup) => (
							subgroup.map(
								(item, index) => {
									const result = item[GLOBAL_CONSTANTS.zeroth_index]?.trim()?.split(
										GLOBAL_CONSTANTS.regex_patterns.white_space,
									);

									const emojiName = item?.[EMOJI_NAME_INDEX];

									const emoji = result.reduce(
										(
											accumulator,
											emojiUnicode,
										) => accumulator + String.fromCodePoint(`0x${emojiUnicode}`),
										'',
									);

									return (
										<div
											key={emojiName || index}
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
								},
							)
						),
					)
				),
			)}
		</div>
	);
}

export default PopBody;
