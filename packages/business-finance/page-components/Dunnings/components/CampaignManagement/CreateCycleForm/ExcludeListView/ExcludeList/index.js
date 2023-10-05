import StyledTable from '../../../../../commons/ExcludeList';

import { config } from './config';
import styles from './styles.module.css';

function ExcludeList({ data, uncheckedRows, setUncheckedRows, loading, setFilters }) {
	return (
		<div className={styles.table}>
			<StyledTable
				data={data}
				uncheckedRows={uncheckedRows}
				setUncheckedRows={setUncheckedRows}
				loading={loading}
				setFilters={setFilters}
				config={config}
			/>
		</div>
	);
}

export default ExcludeList;
