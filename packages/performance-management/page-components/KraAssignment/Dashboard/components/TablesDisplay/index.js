import { isEmpty } from '@cogoport/utils';

import StyledTable from '../../../../../common/StyledTable';
import countTrueValues from '../../../config/countTrueValues';

import getColumns from './getColumns';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';
const TABLE_USED_FOR = 'AccordianData';

function TableDisplay({
	data = {},
	loading,
	OBJECT_OF_IDS = {},
	selectObject = {},
	setSelectObject,
	type = '',
	resetObjects,
	dataFrom,
	setDataFrom,
}) {
	const onClickTable = () => {
		if (dataFrom !== type) {
			setDataFrom(type);
			resetObjects();
		}
	};

	const allElementsPresent = !isEmpty(selectObject)
	&& countTrueValues(selectObject) === countTrueValues(OBJECT_OF_IDS)
		? Object.keys(selectObject).every((key) => Object.prototype.hasOwnProperty.call(OBJECT_OF_IDS, key)
		&& selectObject[key] === OBJECT_OF_IDS[key])
		: false;

	const columns = getColumns({ selectObject, setSelectObject, OBJECT_OF_IDS, loading, allElementsPresent });

	return (
		<div
			className={type === TABLE_USED_FOR ? styles.accordian : styles.container}
			onClick={() => onClickTable()}
			role="button"
			tabIndex={0}
		>
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
