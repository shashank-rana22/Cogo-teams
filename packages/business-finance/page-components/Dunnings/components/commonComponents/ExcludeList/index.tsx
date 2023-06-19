import StyledTable from '../../../../AccountReceivables/commons/styledTable';

import { config } from './config';

interface Props {
	list?:object[],
	uncheckedRows?:string[],
	setUncheckedRows?:Function
}

function ExcludeList({ list, uncheckedRows, setUncheckedRows }:Props) {
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
