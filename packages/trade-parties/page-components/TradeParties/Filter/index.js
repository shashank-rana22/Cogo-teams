import { Select, Input, Popover, Button } from '@cogoport/components';
import { IcMDoubleFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import FilterContent from './FilterContent/index';
import styles from './styles.module.css';

const ONE = 1;
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
function Filter(props) {
	const {
		typeOfSearch,
		setTypeOfSearch,
		globalSearch,
		setGlobalSearch,
		filterParams,
		setFilterParams,
		setPage,
	} = props;

	const setInput = (value) => {
		setGlobalSearch(value);
		setPage(ONE);
	};

	const [isFilterVisible, setIsFilterVisible] = useState(false);

	return (

		<div className={styles.search}>
			<div className={styles.left}>
				<h1>TradeParties</h1>
			</div>
			<div className={styles.right}>
				<div className={styles.filter}>
					<Popover
						render="bottom"
						content={(
							<FilterContent
								filterParams={filterParams}
								setFilterParams={setFilterParams}
								setIsFilterVisible={(value) => setIsFilterVisible(value)}
								setPage={setPage}
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
							Filter
						</Button>
					</Popover>
				</div>
				<div>Search by :</div>
				<div style={{ padding: 16, width: '200px' }}>
					<Select
						value={typeOfSearch}
						onChange={(value) => setTypeOfSearch(value)}
						options={options}
					/>
				</div>

				<Input
					size="md"
					style={{ width: 300 }}
					value={globalSearch}
					onChange={setInput}
					placeholder={PLACEHOLDER_MAPPING[typeOfSearch]}
				/>
			</div>
		</div>
	);
}
export default Filter;
