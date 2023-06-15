import StyledTable from '../../../../AccountReceivables/commons/styledTable';

import { config } from './config';

function ExcludeList({ list, uncheckedRows, setUncheckedRows }) {
	return (
		<StyledTable
			data={list}
			columns={config({
				uncheckedRows,
				setUncheckedRows,
			})}
		/>
	);
}

export default ExcludeList;
