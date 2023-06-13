import StyledTable from '../../../commons/StyledTable';

import tableColumn from './Column';
import HeaderOutward from './HeaderOutward';

interface OutwardInterface {
	setFilters?: React.Dispatch<React.SetStateAction<object>>
	filters?:object
}
function Outward({	filters, setFilters }:OutwardInterface) {
	return (
		<div>
			<HeaderOutward filters={filters} setFilters={setFilters} />

			<div>
				<StyledTable data={[{}]} columns={tableColumn} loading={false} imageFind="" />
			</div>
		</div>
	);
}
export default Outward;
