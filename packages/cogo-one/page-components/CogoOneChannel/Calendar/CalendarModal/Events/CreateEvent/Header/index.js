import { cl } from '@cogoport/components';

import { LABEL, TABS } from '../../../../../../../constants/calenderConstants';

import styles from './styles.module.css';

function Header({
	setEventOccurence = () => {},
	category = '',
	setEventDetails = () => {},
	id = '',
}) {
	return (
		<div className={styles.tabs}>
			{(TABS || []).map((itm) => (
				<div
					key={itm}
					className={cl`${styles.tab} 
					${category === itm ? styles.active_tab : ''}
					${id ? styles.disabled : ''}
					`}
					onClick={() => {
						if (id) {
							return;
						}

						setEventDetails((prevEventDetails) => ({
							...prevEventDetails,
							category: itm,
						}));
						setEventOccurence(() => ({
							showModal : false,
							eventData : null,
						}));
					}}
					role="presentation"
				>
					{LABEL[itm]}
				</div>
			))}
		</div>
	);
}
export default Header;
