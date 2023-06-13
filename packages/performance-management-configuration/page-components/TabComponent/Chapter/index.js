import Header from '../../../commons/CommonHeader';
import StyledTable from '../../../commons/StyledTable';

import useChapter from './useChapter';

const ADD_BUTTON_LABEL = 'Chapter';
const TABLE_EMPTY_TEXT = 'No Chapters created yet';

function Chapter() {
	const { columns, search, setSearch } = useChapter();

	return (
		<div>
			<Header setSearch={setSearch} search={search} label={ADD_BUTTON_LABEL} />

			<StyledTable columns={columns} data={[{}]} emptyText={TABLE_EMPTY_TEXT} loading={false} />
		</div>
	);
}

export default Chapter;
