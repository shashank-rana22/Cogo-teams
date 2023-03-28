import { Select, Input } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Filters({ filter = '', setFilter = () => {}, searchValue = '', setSearchValue = () => {} }) {
	const handleSearchValue = (search) => {
		setSearchValue(search);
	};
	const options = [
		{ label: 'Passed', value: 'passed' },
		{ label: 'Failed', value: 'failed' },
	];

	return (
		<div className={styles.container}>
			<Input
				size="md"
				placeholder="Search for Student name"
				value={searchValue}
				onChange={handleSearchValue}
				suffix={(
					<div className={styles.icon_container}>
						<IcMSearchlight />
					</div>
				)}
				style={{ width: 300 }}
			/>
			<div className={styles.filters}>

				<Select
					prefix={(<IcMFilter />)}
					value={filter}
					onChange={(val) => setFilter(val)}
					placeholder="Filter"
					options={options}
					isClearable="true"
				/>

			</div>
		</div>
	);
}

export default Filters;
