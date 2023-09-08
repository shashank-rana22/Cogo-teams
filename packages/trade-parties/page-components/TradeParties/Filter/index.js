import { Select, Input, Popover, Button } from '@cogoport/components';
import { IcMDoubleFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

const PLACEHOLDER_MAPPING = {
	sage_organization_id : 'Search by Sage BPR',
	trade_party          : 'Search by Business Name / PAN / Serial ID / Trade Name',

};
const options = [
	{
		label : 'Trade Party',
		value : 'trade_party',
	},
	{
		label : 'Sage ID',
		value : 'sage_organization_id',
	},

];
function Filter({
	typeOfSearch = '',
	setTypeOfSearch = () => {},
	globalSearch = '',
	setGlobalSearch = () => {},
	filterParams = {},
	setFilterParams = () => {},
}) {
	const setInput = (value) => {
		setGlobalSearch(value);
		setFilterParams({ ...filterParams, page: 1 });
	};

	const [isFilterVisible, setIsFilterVisible] = useState(false);

	return (

		<div className={styles.search}>
			<div className={styles.left}>
				<h1>TradeParties</h1>
			</div>
			<div className={styles.right}>
				<Popover
					render="bottom"
					content={(
						<FilterContent
							filterParams={filterParams}
							setFilterParams={setFilterParams}
							setIsFilterVisible={setIsFilterVisible}
						/>
					)}
					onClickOutside={() => setIsFilterVisible(false)}
					visible={isFilterVisible}
				>
					<Button
						themeType="secondary"
						size="md"
						onClick={() => setIsFilterVisible(!isFilterVisible)}
					>
						<IcMDoubleFilter style={{ marginRight: '5px' }} />
						<b>	FILTER </b>
					</Button>
				</Popover>
				<div>Search by :</div>
				<div className={styles.type_of_search}>
					<Select
						size="sm"
						value={typeOfSearch}
						onChange={setTypeOfSearch}
						options={options}
					/>
				</div>

				<Input
					size="sm"
					style={{ width: 300 }}
					value={globalSearch}
					onChange={setInput}
					placeholder={PLACEHOLDER_MAPPING[typeOfSearch]}
					prefix={<IcMSearchlight height={16} width={16} />}
				/>
			</div>
		</div>
	);
}
export default Filter;
