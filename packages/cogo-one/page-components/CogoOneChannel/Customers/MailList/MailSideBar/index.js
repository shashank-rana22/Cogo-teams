import { cl } from '@cogoport/components';
import React, { useState } from 'react';

import { GMAIL_OPTIONS_CONFIG } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';

function MailSideBar({
	activeFolder = '',
	setActiveFolder = () => {},
	setAppliedFilters = () => {},
}) {
	const [hover, setHover] = useState('');

	return (
		<div className={styles.sidebar_container}>
			{GMAIL_OPTIONS_CONFIG.map(
				({
					label = '',
					icon = null,
					value = '',
					image = '',
					hoverImage = '',
				}) => (
					<div
						role="presentation"
						key={value}
						className={cl`${styles.content} ${activeFolder === value ? styles.active_content : ''}`}
						onMouseEnter={() => setHover(value)}
						onMouseLeave={() => setHover('')}
						onClick={() => {
							setActiveFolder(value);
							setAppliedFilters(null);
						}}
					>
						{image
							? (
								<div
									className={styles.icon_styles}
									style={{
										backgroundImage: `url(${[activeFolder, hover].includes(value)
											? hoverImage : image})`,
									}}
								/>
							)
							: icon}
						<span
							className={cl`${styles.folder_name} 
								${activeFolder === value ? styles.active_content : ''}`}
						>
							{label}
						</span>
					</div>
				),
			)}
		</div>
	);
}

export default MailSideBar;
