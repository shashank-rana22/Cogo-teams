import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function AccordionView({
	itemKey = '',
	active = '',
	title = null,
	isOpen = true,
	children = null,
	setActive = () => {},
}) {
	const handleClick = () => {
		if (active === itemKey) {
			setActive('');
		} else setActive(itemKey);
	};

	return (
		<div className={cl`${styles.container} custom_accordion_main_container`}>
			<div
				role="presentation"
				className={cl`${styles.title} custom_accordion_title_container`}
				onClick={handleClick}
			>
				{title}
			</div>

			{(active === itemKey && isOpen) ? (
				<div className={cl`${styles.content} custom_accordion_content_container`}>
					{children}
				</div>
			) : null}
		</div>
	);
}

export default AccordionView;
