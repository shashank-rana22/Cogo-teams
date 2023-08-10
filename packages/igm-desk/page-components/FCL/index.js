import HeaderFilters from '../../commons/HeaderFilters';
import RenderList from '../../commons/RenderList';
import Tabs from '../../commons/Tabs';
import FCL_COMMON_TABS from '../../config/FCL_COMMON_TABS';

import Card from './Card';
import Filters from './Filters';
import styles from './styles.module.css';

export default function FclDesk() {
	return (
		<>
			<span className={styles.flex_row}>
				<h1>IGM Desk</h1>

				<HeaderFilters />
			</span>

			<div className={styles.flex_row}>
				<Tabs tabs={FCL_COMMON_TABS} />
				<div className={styles.filters}>
					<Filters />
				</div>
			</div>

			<RenderList Card={Card} tabs={FCL_COMMON_TABS} />
		</>
	);
}
