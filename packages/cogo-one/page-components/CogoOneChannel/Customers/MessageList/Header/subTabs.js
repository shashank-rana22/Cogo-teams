import { cl } from '@cogoport/components';

import { getSubTabsMapping } from '../../../../../configurations/getSubTabsMapping';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';

import styles from './styles.module.css';

const MORE_THAN_SINGLE_TAB = 2;

function SubTabs({
	activeSubTab,
	setActiveSubTab,
	viewType,
	setAppliedFilters,
	setIsBotSession,
}) {
	const subTabMapping = getSubTabsMapping({ viewType });

	const handleTabClick = ({ name }) => {
		setActiveSubTab(name);
		setAppliedFilters({});

		if (!VIEW_TYPE_GLOBAL_MAPPING[viewType].permissions?.bot_message_toggle) {
			setIsBotSession(false);
		}
	};

	if (subTabMapping?.length < MORE_THAN_SINGLE_TAB) {
		return null;
	}

	return (
		<div className={styles.parent_tab_div}>
			{subTabMapping.map((eachTab = {}) => (
				<div
					key={eachTab?.name}
					role="presentation"
					className={cl`${styles.each_tab_flex} 
								${activeSubTab === eachTab?.name ? styles.active_tab_styles : ''}`}
					onClick={() => handleTabClick({ name: eachTab?.name })}
				>
					<div className={styles.icon_styles}>
						{eachTab.icon || null}
					</div>

					<text className={styles.label}>
						{eachTab.label}
					</text>
				</div>
			))}
		</div>
	);
}

export default SubTabs;
