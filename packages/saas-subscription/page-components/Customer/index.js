import ArrowStepper from '../../common/ArrowStepper';
import useGetUserList from '../../hooks/useGetUserList';

import FilterContainer from './FilterContainer';
import styles from './styles.module.css';
import Table from './Table';

function CustomerSubscription() {
	const {
		data = {}, loading = false,
		globalFilters, refectUserList, setGlobalFilters,
	} =	useGetUserList();

	const { segment_stats = {}, ...userList } = data || {};

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<FilterContainer
					setGlobalFilters={setGlobalFilters}
					refectUserList={refectUserList}
				/>
				<ArrowStepper
					stepperData={segment_stats}
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
				/>
				<Table userList={userList} loading={loading} setGlobalFilters={setGlobalFilters} />
			</div>

		</div>
	);
}

export default CustomerSubscription;
