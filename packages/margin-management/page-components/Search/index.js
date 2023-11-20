import { Popover } from '@cogoport/components';
import { IcMDoubleFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import SearchForm from './SearchForm';
import getControls from './SearchForm/controls';
import styles from './styles.module.css';

function Search({ activeTab = '', activeService = '', setFilterParams = () => { }, filterParams = {} }) {
	const [showPopver, setShowPopver] = useState(false);

	const { controls = {} } = getControls({ activeTab });

	const filterKeys = controls.map((controlItem) => controlItem.name);

	const hasAnyValueInFilterParams = (obj, keysArray) => keysArray.some((key) => obj[key] !== undefined);

	const isFilterApplied = hasAnyValueInFilterParams(filterParams, filterKeys);

	return (
		<div className={styles.container}>
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
					className={styles.filter_btn_container}
					role="presentation"
					onClick={() => setShowPopver(!showPopver)}
				>
					<IcMDoubleFilter height={24} width={24} />
					Filter
					{isFilterApplied ? (
						<div className={styles.red_dot} />
					) : null}
				</div>
			</Popover>
		</div>

	);
}
export default Search;
