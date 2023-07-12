import { cl } from '@cogoport/components';
import React, { useState } from 'react';

import { GMAIL_OPTIONS_CONFIG } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';

function MailSideBar({
	activeSelect = '',
	setActiveSelect = () => {},
}) {
	const [hover, setHover] = useState('');

	return (
		<div className={styles.sidebar_container}>
			{GMAIL_OPTIONS_CONFIG.map(
				({
					label = '',
					Icon = null,
					value = '',
					image = '',
					hoverImage = '',
				}) => (
					<div
						role="presentation"
						key={value}
						className={cl`${styles.content} ${activeSelect === value ? styles.active_content : ''}`}
						onMouseEnter={() => setHover(value)}
						onMouseLeave={() => setHover('')}
						onClick={() => setActiveSelect(value)}
					>
						{image
							? (
								<div
									className={styles.icon_styles}
									style={{
										backgroundImage: `url(${[activeSelect, hover].includes(value)
											? hoverImage : image})`,
									}}
								/>
							)
							: <Icon />}
						<span className={styles.folder_name}>
							{label}
						</span>
					</div>
				),
			)}
		</div>
	);
}

export default MailSideBar;
