import { cl } from '@cogoport/components';

import { LABEL, TABS } from '../../../../../../../constants/CALENDAR_CONSTANTS';

import styles from './styles.module.css';

function Header({
	setEventOccurence = () => {},
	category = '',
	setEventDetails = () => {},
}) {
	return (
		<div className={styles.tabs}>
			{(TABS || []).map((itm) => (
				<div
					key={itm}
					className={cl`${styles.tab} ${category === itm ? styles.active_tab : ''}`}
					onClick={() => {
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
