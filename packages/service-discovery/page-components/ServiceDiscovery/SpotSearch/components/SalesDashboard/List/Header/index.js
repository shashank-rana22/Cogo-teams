import { isEmpty } from '@cogoport/utils';

import SearchInput from '../../../../../../../common/SearchInput';

import ExtraFilters from './ExtraFilters';
import FilterButton from './FilterFormButton';
import styles from './styles.module.css';

function Header({
	filters = {},
	filterProps = {},
	setFilters = () => {},
	type = '',
	serviceType = '',
	setServiceType = () => {},
	isRateList = false,
}) {
	const {
		controls = [],
		searchKey = null,
		searchPlaceholder = null,
	} = filterProps;

	const otherFilters = filters || {};

	let searchBar = null;

	if (searchKey) {
		searchBar = (
			<SearchInput
				style={{ marginRight: 8 }}
				onSearch={(val) => {
					setFilters({
						...otherFilters,
						[searchKey] : val,
						page        : 1,
					});
				}}
				onReset={() => {
					setFilters({
						...otherFilters,
						[searchKey] : undefined,
						page        : 1,
					});
				}}
				size="sm"
				value={filters?.[searchKey]}
				placeholder={searchPlaceholder || 'Org Name email phone'}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.search_bar}>
				{searchBar}
			</div>

			<div className={styles.extra_filters}>
				<ExtraFilters
					type={type}
					filters={filters}
					serviceType={serviceType}
					setFilters={setFilters}
					setServiceType={setServiceType}
				/>
			</div>

			{!isEmpty(controls) ? (
				<FilterButton
					controls={controls}
					filters={filters}
					isRateList={isRateList}
					setFilters={setFilters}
					type={type}
					serviceType={serviceType}
				/>
			) : null}
		</div>
	);
}

export default Header;
