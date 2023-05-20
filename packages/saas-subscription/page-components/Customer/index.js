import ArrowStepper from '../../common/ArrowStepper';
import { ARROW_STEPPER } from '../../constant/stepperConstant';
import useGetUserList from '../../hooks/useGetUserList';
import useGetUserStats from '../../hooks/useGetUserStats';

import FilterContainer from './FilterContainer';
import styles from './styles.module.css';
import Table from './Table';

function CustomerSubscription() {
	const { userStatsData, refetchUserStats } = useGetUserStats();
	const {
		userList, loading,
		globalFilters, refectUserList, setGlobalFilters,
	} =	useGetUserList();

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<FilterContainer
					setGlobalFilters={setGlobalFilters}
					refetchUserStats={refetchUserStats}
					refectUserList={refectUserList}
				/>
				<ArrowStepper
					items={ARROW_STEPPER}
					stepperData={userStatsData}
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
				/>
				<Table userList={userList} loading={loading} setGlobalFilters={setGlobalFilters} />
			</div>

		</div>
	);
}

export default CustomerSubscription;
