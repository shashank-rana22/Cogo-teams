import StyledTable from '../../../common/StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';
const TABLE_USED_FOR = 'AccordianData';

function TableDisplay({
	data = {},
	loading,
	ARRAY_OF_IDS = [],
	selectArray = [],
	setSelectArray,
	type = '',
}) {
	const removeItem = (valueToRemove) => {
		const updatedItems = selectArray.filter((item) => item !== valueToRemove);
		setSelectArray(updatedItems);
	};
	const columns = getColumns({ selectArray, setSelectArray, ARRAY_OF_IDS, removeItem, loading });

	return (
		<div className={type === TABLE_USED_FOR ? styles.accordian : styles.container}>
			<StyledTable
				columns={columns}
				data={data}
				emptyText={TABLE_EMPTY_TEXT}
				loading={loading}
			/>
		</div>
	);
}

export default TableDisplay;
