import StyledTable from '../../../commons/StyledTable/index.tsx';

import Column from './Column';
import HeaderOutward from './HeaderOutward';

function Outward({	filters, setFilters }) {
	return (
		<div>
			<HeaderOutward filters={filters} setFilters={setFilters} />

			<div>
				<StyledTable data={[{}]} columns={Column()} loading={false} imageFind="" />
			</div>
		</div>
	);
}
export default Outward;
