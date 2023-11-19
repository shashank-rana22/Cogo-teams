import React from 'react';

import useGetNextPayroll from '../../../../hooks/useGetNextPayroll';
import useGetPayrollDashboard from '../../../../hooks/useGetPayrollDashboard';
import useGetPayrollDashboardGraph from '../../../../hooks/useGetPayrollDashboardGraph';
import useGetPayrollOverview from '../../../../hooks/useGetPayrollOverview';

import ActivityLogs from './ActivityLogs';
import CompanyPaymentOverview from './CompanyPaymentOverview';
import Heading from './Heading';
import Overview from './Overview';
import RelatedLinks from './RelatedLinks';
import styles from './styles.module.css';
import ToDoTasks from './ToDoTasks';

function DashboardPayroll() {
	const { data, loading:loadingDashboard } = useGetPayrollDashboard();
	const { data:list } = useGetNextPayroll({ return_list: true });
	const {
		getEmployeePayrollOverview = () => {},
		data:payrollOverView,
	}	= useGetPayrollOverview();

	const {
		getEmployeePayrollDashboardGraph = () => {},
		data:graphItem,
		loading:loadingGraph,
	} = useGetPayrollDashboardGraph();

	const { employee_name } = data || {};

	return (
		<div className={styles.main_container}>
			<div>
				<Heading
					employee_name={employee_name}
					list={list}
					loadingDashboard={loadingDashboard}
					getEmployeePayrollDashboardGraph={getEmployeePayrollDashboardGraph}
					getEmployeePayrollOverview={getEmployeePayrollOverview}
				/>
				<Overview getEmployeePayrollOverview={getEmployeePayrollOverview} payrollOverView={payrollOverView} />
			</div>
			<div className={styles.middle_container}>
				<ToDoTasks data={data} />
				<CompanyPaymentOverview
					getEmployeePayrollDashboardGraph={getEmployeePayrollDashboardGraph}
					graphItem={graphItem}
					loading={loadingGraph}
				/>
			</div>
			<div className={styles.last_container}>
				<ActivityLogs data={data} />
				<RelatedLinks data={data} />
			</div>
		</div>

	);
}

export default DashboardPayroll;
