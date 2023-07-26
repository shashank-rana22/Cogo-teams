import React from 'react';

import styles from './styles.module.css';

function AccordianView({
	itemKey = '',
	active = '',
	title = null,
	isOpen = true,
	content = null,
	setActive = () => {},
}) {
	const handleClick = () => {
		if (active === itemKey) {
			setActive('');
		} else setActive(itemKey);
	};

	return (
		<div className={`${styles.container} custom_accordian_main_container`}>
			<div
				role="presentation"
				className={`${styles.title} custom_accordian_title_container`}
				onClick={handleClick}
			>
				{title}
			</div>

			{(active === itemKey && isOpen) ? (
				<div className={`${styles.content} custom_accordian_content_container`}>
					{content}
				</div>
			) : null}
		</div>
	);
}

export default AccordianView;
