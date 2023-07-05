import { Pagination, Table, TabPanel, Tabs, Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import EmptyState from '../../../CreateModule/components/EmptyState';
import Filters from '../../commons/Filters';

import useStudentWiseTestResult from './hooks/useStudentWiseTestResult';
import useUpdateTestUserMapping from './hooks/useUpdateTestUserMapping';
import styles from './styles.module.css';
import getTableColumns from './TableColumns';

function StudentsComponent({ test_id, status, activeAttempt, retest }) {
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const {
		data = {},
		loading,
		refetch,
		activeTab,
		sortFilter,
		setSortFilter,
		debounceQuery,
		setActiveTab,
		filter,
		setFilter,
		searchValue,
		setSearchValue,
		params,
		setParams,
		reAttemptLoading,
		handleReAttempt,
		showReAttemptModal,
		setShowReAttemptModal,
		STUDENTS_MAPPING,
	} = useStudentWiseTestResult({ test_id, activeAttempt });

	const { userSessionMapping, setUserId } = useUpdateTestUserMapping({ refetch });

	const { page_limit = 0, total_count = 0, list = [], stats = {} } = data || {};

	const handleDelete = () => {
		userSessionMapping(test_id);
	};

	const columns = getTableColumns({
		sortFilter,
		setSortFilter,
		setShowReAttemptModal,
		activeTab,
		showModal,
		setShowModal,
		handleDelete,
		setUserId,
		router,
		status,
		activeAttempt,
		retest,
	});

	useEffect(() => {
		refetch();
	}, [params, refetch]);

	return (
		<div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					{Object.keys(STUDENTS_MAPPING).map((item) => {
						const { title } = STUDENTS_MAPPING[item];

						return (
							<TabPanel
								key={item}
								name={item}
								badge={stats?.[item] || '0'}
								title={title}
							/>
						);
					})}
				</Tabs>
			</div>

			<Filters
				filter={filter}
				setFilter={setFilter}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				debounceQuery={debounceQuery}
				activeTab={activeTab}
			/>

			<Modal
				size="sm"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
				showCloseIcon={false}
			>
				<Modal.Header title="Are you sure you want to delete this User?" />

				<Modal.Body>
					<div className={styles.btn_container}>
						<Button
							type="button"
							themeType="secondary"
							onClick={() => setShowModal(false)}
							className={styles.btn_container}
						>
							Cancel
						</Button>

						<Button
							type="button"
							style={{ marginLeft: '8px' }}
							onClick={() => {
								handleDelete();
								setShowModal(false);
							}}
						>
							Delete
						</Button>
					</div>
				</Modal.Body>
			</Modal>

			{showReAttemptModal ? (
				<Modal
					size="sm"
					show={showReAttemptModal}
					onClose={() => setShowReAttemptModal(false)}
					placement="center"
					showCloseIcon={false}
				>
					<Modal.Header title="Are you sure you want this user to re-attempt the test?" />

					<Modal.Body>
						<div className={styles.btn_container}>
							<Button
								type="button"
								themeType="secondary"
								loading={reAttemptLoading}
								onClick={() => setShowReAttemptModal(false)}
								className={styles.btn_container}
							>
								Cancel
							</Button>

							<Button
								type="button"
								style={{ marginLeft: '8px' }}
								loading={reAttemptLoading}
								onClick={() => {
									handleReAttempt();
									setShowReAttemptModal(false);
								}}
							>
								Allow Re-Attempt
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			) : null}

			{!loading && isEmpty(list)
				? <EmptyState />
				: (
					<div className={styles.table_container}>
						<Table
							className={styles.table_container}
							data={list || []}
							columns={columns}
							loading={loading}
						/>

						{total_count > page_limit ? (
							<div className={styles.pagination_container}>
								<Pagination
									type="table"
									currentPage={params?.page}
									totalItems={total_count}
									pageSize={page_limit}
									onPageChange={(val) => setParams((prev) => ({ ...prev, page: val }))}
								/>
							</div>
						) : null}
					</div>
				)}
		</div>
	);
}

export default StudentsComponent;
