import { Popover } from '@cogoport/components';
import { IcMDoubleFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import SearchForm from './SearchForm';

function Search({ activeTab = '', activeService = '', setFilterParams = () => { }, filterParams = {} }) {
	const [showPopver, setShowPopver] = useState(false);

	return (
		<Popover
			visible={showPopver}
			content={(
				<SearchForm
					activeTab={activeTab}
					activeService={activeService}
					setFilterParams={setFilterParams}
					filterParams={filterParams}
					setShowPopver={setShowPopver}
				/>
			)}
			placement="bottom"
		>
			<div
				style={{
					display         : 'flex',
					alignItems      : 'center',
					backgroundColor : '#fff',
					borderRadius    : '4px',
					padding         : '8px 16px',
				}}
				role="presentation"
				onClick={() => setShowPopver(!showPopver)}
			>
				<IcMDoubleFilter height={24} width={24} />
				Filter
			</div>
		</Popover>
	);
}
export default Search;
