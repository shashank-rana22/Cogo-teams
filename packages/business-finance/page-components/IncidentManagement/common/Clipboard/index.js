import { Popover } from '@cogoport/components';
import { IcMCopy } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ClipBoard({ data = '', content = 'Copied', showText = true, style = {} }) {
	const [check, setCheck] = useState(false);
	if (!data) return null;
	return (
		<div className={styles.container}>
			{showText && (
				<span className={styles.sub_name} style={style}>
					{data}
				</span>
			) }

			<Popover
				placement="top"
				show={check}
				content={content}
				theme="light"
				interactive
			>
				<button
					className={styles.icon_container}
					style={{ all: 'unset', cursor: 'pointer' }}
					onClick={(e) => {
						e.stopPropagation();
						navigator.clipboard.writeText(data);
						setCheck(true);
					}}
				>
					<IcMCopy
						width="15px"
						height="15px"
					/>
				</button>
			</Popover>
		</div>
	);
}
export default ClipBoard;
