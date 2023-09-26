import { TabPanel, Tabs } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import Layout from '../../../common/Layout';

import ShowModal from './common/ShowModal';
import BudgetAllocate from './components/BudgetAllocate';
import CreateAllocationCard from './components/CreateAllocationCard';
import ViewModal from './components/ViewModal';
import BudgetAllocationControls from './controls/budget-allocation-form-controls';
import RadioOptions from './controls/budget-allocation-radio';
import RoleOptions from './controls/budget-allocation-role';
import useListPromoBudgetAllocation from './hooks/useListPromoBudgetAllocations';
import styles from './styles.module.css';

const TABS = [
	{ name: 'active_budget', title: 'Active', key: 'active_budget' },
	{ name: 'inactive_budget', title: 'Deactivated', key: 'inactive_budget' },
];

function BudgetAllocationTab({ formButton, setFormButton }) {
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedDetails, setSelectedDetails] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState();
	const [activeTab, setActiveTab] = useState('active_budget');
	const [role, setRole] = useState('');
	const DEFAULT_VALUES = {};

	const {
		control: roleControl,
		watch: roleWatch,
		setValue: roleSetValue,
		errors: roleErrors,
	} = useForm({ defaultValues: DEFAULT_VALUES });
	const roleControls = RoleOptions;

	const {
		control,
		handleSubmit,
		formState: { errors = {} },
		reset,
	} = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	const controls = BudgetAllocationControls;

	const {
		control: radioControl,
		handleSubmit: radiohandleSubmit,
		formState: { errors: radioErrors },
		reset: radioReset,
		watch: radioWatch,
	} = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	const radioControls = RadioOptions;

	const {
		loading,
		promoBudgetList,
		paginationData,
		pagination,
		setPagination,
		refetch,
	} = useListPromoBudgetAllocation({ activeTab, role });

	const budgetAllocateProps = {
		setSelectedDetails,
		setShowViewModal,
		promoBudgetList,
		paginationData,
		setPagination,
		pagination,
		activeTab,
		loading,
		refetch,
		setRole,
		role,
	};

	const showForm = () => {
		setFormButton(!formButton);
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
			{formButton && (
				<CreateAllocationCard
					setFormData={setFormData}
					setShowModal={setShowModal}
					setFormButton={setFormButton}
					formButton={formButton}
					control={control}
					controls={controls}
					handleSubmit={handleSubmit}
					errors={errors}
					reset={reset}
				/>
			)}
			<div className={styles.tab_container}>
				<div className={styles.select_wrapper}>
					<Layout controls={roleControls} control={roleControl} errors={roleErrors} />
				</div>
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
			{showViewModal && selectedDetails && (
				<ViewModal
					showViewModal={showViewModal}
					setShowViewModal={setShowViewModal}
					selectedDetails={selectedDetails}
					refetchListBudgetAllocation={refetch}
				/>
			)}
			{showModal && (
				<ShowModal
					setShowModal={setShowModal}
					FormData={formData}
					setFormData={setFormData}
					refetch={refetch}
					showForm={showForm}
					reset={reset}
					radiohandleSubmit={radiohandleSubmit}
					radioErrors={radioErrors}
					radioReset={radioReset}
					radioControl={radioControl}
					radioControls={radioControls}
					radioWatch={radioWatch}
				/>
			)}
		</div>
	);
}

export default BudgetAllocationTab;
