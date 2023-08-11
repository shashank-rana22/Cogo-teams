import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function GetSearchCrossIcon({ globalFilters = {}, setGlobalFilters = () => {} }) {
	if (isEmpty(globalFilters.search)) {
		return (
			<div className={styles.icon_wrapper}>
				<IcMSearchlight />
			</div>
		);
	}
	return (
		<div className={styles.icon_wrapper}>
			<IcMCross
				onClick={() => setGlobalFilters((prev) => ({ ...prev, search: '' }))}
				style={{ cursor: 'pointer', color: '#000000' }}
			/>
		</div>
	);
}
export default GetSearchCrossIcon;
