import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import Layout from '../../../common/Layout';

import BudgetAllocate from './components/BudgetAllocate';
import CreateAllocationCard from './components/CreateAllocationCard';
import ViewModal from './components/ViewModal';
import RoleOptions from './controls/budget-allocation-role';
import useListPromoBudgetAllocation from './hooks/useListPromoBudgetAllocations';
import styles from './styles.module.css';

const TABS = [
	{ name: 'active_budget', title: 'Active', key: 'active_budget' },
	{ name: 'inactive_budget', title: 'Deactivated', key: 'inactive_budget' },
];
const DEFAULT_VALUES = {};

function BudgetAllocationTab() {
	const [showAllocationCard, setShowAllocationCard] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);

	const [selectedDetails, setSelectedDetails] = useState({});
	const [activeTab, setActiveTab] = useState('active_budget');
	const [role, setRole] = useState('');

	const {
		control: roleControl,
		watch: roleWatch,
		setValue: roleSetValue,
		errors: roleErrors,
	} = useForm({ defaultValues: DEFAULT_VALUES });
	const roleControls = RoleOptions;

	const {
		loading,
		promoBudgetList,
		paginationData,
		setPagination,
		refetch,
	} = useListPromoBudgetAllocation({ activeTab, role });

	const budgetAllocateProps = {
		setSelectedDetails,
		setShowViewModal,
		promoBudgetList,
		paginationData,
		setPagination,
		activeTab,
		loading,
		refetch,
		setRole,
		role,
	};

	useEffect(() => {
		setRole('');
		roleSetValue('role', '');
	}, [activeTab, roleSetValue]);

	useEffect(() => {
		const subscription = roleWatch((val) => {
			setRole(val.role);
		});
		return () => subscription.unsubscribe();
	}, [roleWatch]);

	return (
		<div>
			<CreateAllocationCard
				showAllocationCard={showAllocationCard}
				setShowAllocationCard={setShowAllocationCard}
				refetch={refetch}
			/>
			<div className={styles.tab_container}>
				<div className={styles.select_wrapper}>
					<Layout controls={roleControls} control={roleControl} errors={roleErrors} />
				</div>
				{!showAllocationCard ? (
					<div className={styles.allocate_button}>
						<Button onClick={() => setShowAllocationCard((state) => !state)}>
							ALLOCATE
						</Button>
					</div>
				) : null}
				<Tabs
					activeTab={activeTab}
					onChange={setActiveTab}
					className="horizontal four"
					themeType="tertiary"
				>
					{TABS.map((item) => (
						<TabPanel
							key={item.key}
							name={item.name}
							title={item.title}
							className="horizontal four"
						>
							<BudgetAllocate {...budgetAllocateProps} />
						</TabPanel>
					))}
				</Tabs>
			</div>
			{(showViewModal && selectedDetails) ? (
				<ViewModal
					setShowViewModal={setShowViewModal}
					selectedDetails={selectedDetails}
					refetchListBudgetAllocation={refetch}
				/>
			) : null}
		</div>
	);
}

export default BudgetAllocationTab;
