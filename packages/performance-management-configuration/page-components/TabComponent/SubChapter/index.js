import Header from '../../../commons/CommonHeader';
import StyledTable from '../../../commons/StyledTable';

import useSubChapter from './useSubChapter';

const ADD_BUTTON_TEXT = 'Sub Chapter';
const TABLE_EMPTY_TEXT = 'No sub chapters created yet';

function SubChapter() {
	const { columns, search, setSearch } = useSubChapter();

	return (
		<div>
			<Header setSearch={setSearch} search={search} label={ADD_BUTTON_TEXT} />

			<StyledTable columns={columns} data={[{}]} emptyText={TABLE_EMPTY_TEXT} loading={false} />
		</div>
	);
}

export default SubChapter;
