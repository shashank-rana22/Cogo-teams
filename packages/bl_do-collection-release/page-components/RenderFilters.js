import { cl } from '@cogoport/components';

import ClickableDiv from '../commons/ClickableDiv';
import TAB_CONFIG from '../configs/TAB_CONFIG.json';

import styles from './styles.module.css';

export const RenderFilters = ({ stateProps = {}, setStateProps = () => {} }) => {
	<div className={styles.filters_tabs}>
		{
        TAB_CONFIG.TABS.map((item) => (
	<ClickableDiv
		onClick={() => setStateProps({
			...stateProps,
			ready_to_collect : false,
			ready_to_release : false,
			inner_tab        : item.value,
			document_status  : undefined,
			page             : 1,
		})}
		key={item?.value}
	>
		<div className={cl`${stateProps.inner_tab === item.value ? styles.active : ''} 
            ${styles.service_tab}`}
		>
			{item.label}
		</div>
	</ClickableDiv>
        ))
}
	</div>;
};
