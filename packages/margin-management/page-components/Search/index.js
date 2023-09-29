import { Popover } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import SearchForm from './SearchForm';

function Search({ activeTab = '', setFilterParams = () => {}, filterParams = {} }) {
	return (
		<Popover
			content={(
				<SearchForm
					activeTab={activeTab}
					setFilterParams={setFilterParams}
					filterParams={filterParams}
				/>
			)}
			placement="bottom"
		>
			<IcMSearchlight style={{ width: '2rem', height: '2rem', cursor: 'pointer', marginRight: 10 }} />
		</Popover>
	);
}
export default Search;
