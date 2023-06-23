import StyledTable from '../../../../../commons/ExcludeList';

import { config } from './config';
import styles from './styles.module.css';

export interface ListDataProps {
	list: object[];
	pageNo?: number;
	totalRecords?: number;
}
interface ExcludeListInterface {
	data?: ListDataProps;
	uncheckedRows?: string[];
	setUncheckedRows?: React.Dispatch<React.SetStateAction<string[]>>;
	loading?: boolean;
	setFilters?: React.Dispatch<React.SetStateAction<object>>;
}

function ExcludeList({ data, uncheckedRows, setUncheckedRows, loading, setFilters }: ExcludeListInterface) {
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
