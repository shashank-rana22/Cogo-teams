import React from 'react';

import styles from './styles.module.css';

function AccordianView({
	active = false,
	title = null,
	content = null,
	setActive = () => {},
}) {
	// const handleClick = (event) => {
	// 	event.stopPropagation();
	// 	if (active) setActive(false);
	// };

	return (
		<div className={`${styles.container} custom_accordian_main_container`}>
			<div
				role="presentation"
				className={`${styles.title} custom_accordian_title_container`}
				// onClick={handleClick}
			>
				{title}
			</div>

			{active ? (
				<div className={`${styles.content} custom_accordian_content_container`}>
					{content}
				</div>
			) : null}
		</div>
	);
}

export default AccordianView;
