import { Table, Pagination, Modal, Button, Textarea, Select, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetReimbursementStatus from '../../../../hooks/useGetReimbursementStatus';
import useListReimbursements from '../../../../hooks/useListReimbursements';
import useUpdateReimbursements from '../../../../hooks/useUpdateReimbursements';
import EmptyState from '../../commons/EmptyState';

import ActivityModal from './ActivityModal';
import getColumns from './getColumns';
import getColumnsManager from './getColumnsManager';
import styles from './styles.module.css';

const MONTHS = [
	{ label: 'January', value: 1 },
	{ label: 'February', value: 2 },
	{ label: 'March', value: 3 },
	{ label: 'April', value: 4 },
	{ label: 'May', value: 5 },
	{ label: 'June', value: 6 },
	{ label: 'July', value: 7 },
	{ label: 'August', value: 8 },
	{ label: 'September', value: 9 },
	{ label: 'October', value: 10 },
	{ label: 'November', value: 11 },
	{ label: 'December', value: 12 },
];

function ExpenseHistory({ toggleValue, hr_view, value }) {
	const {
		loading, data, filters,
		setFilters, refetchlist, debounceQuery,
	} = useListReimbursements({ toggleValue, value });
	const { updateReiembursement } = useUpdateReimbursements();
	const { loading : loading1, data: status_data } = useGetReimbursementStatus();
	const { list, page, total_count, page_limit } = data || {};
	const [show, setShow] = useState(false);
	const [show1, setShow1] = useState(false);
	const [item, setItem] = useState({});
	const [remark_text, setRemarkText] = useState('');
	const [payload, setPayload] = useState({});
	const [search, setSearch] = useState('');

	const handleUpdateReimbursement = async () => {
		await updateReiembursement(payload?.id, payload?.action, remark_text, refetchlist);
		setShow1(false);
		setPayload({});
		setRemarkText('');
	};
	const handleUpdate = async (id, action) => {
		setPayload({ id, action });
		if (action === 'delete') {
			await updateReiembursement(id, action, remark_text, refetchlist);
			setPayload({});
		} else {
			setShow1(true);
		}
	};

	const handlePagination = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	const handleClose = () => {
		setShow(false);
		setItem({});
	};

	const columns1 = getColumnsManager({ setShow, setItem, handleUpdate, hr_view });
	const columns2 = getColumns({ setShow, setItem, handleUpdate });
	return (
		<div className={styles.sub_container}>
			<div className={styles.head}>
				<div className={styles.top_text_container}>

					<span className={styles.top_bold_text}>Expense history</span>
					<span className={styles.top_grey_text}>View all you expenses</span>

				</div>
				<div className={styles.header_input}>
					<div className={styles.input_filters}>
						<Select
							size="md"
							placeholder="Month"
							className={styles.select_input}
							value={filters?.month}
							options={MONTHS}
							isClearable
							onChange={(e) => {
								setFilters((prev) => ({ ...prev, month: e, page: 1 }));
							}}
						/>
					</div>
					{
						!loading1
							? (
								<>
									<div className={styles.input_filters}>
										<Select
											size="md"
											placeholder="Category"
											className={styles.select_input}
											value={filters?.category}
											options={status_data?.expense_category}
											isClearable
											onChange={(e) => {
												setFilters((prev) => ({ ...prev, category: e, page: 1 }));
											}}
										/>
									</div>
									<div className={styles.input_filters}>
										<Select
											size="md"
											placeholder="Status"
											className={styles.select_input}
											value={filters?.reimbursement_status}
											options={status_data?.expense_status}
											isClearable
											onChange={(e) => {
												setFilters((prev) => ({ ...prev, reimbursement_status: e, page: 1 }));
											}}
										/>
									</div>
								</>

							)
							: null
					}
					<div className={styles.input_filters}>
						{
							(hr_view === 'manager' || hr_view === 'hr') && !toggleValue
								? (
									<Input
										size="md"
										className={styles.select_input}
										placeholder="Search"
										onChange={(val) => {
											setSearch(val);
											debounceQuery(val);
											setFilters((prev) => ({ ...prev, page: 1 }));
										}}
										name="search_payroll"
										value={search}
									/>
								)
								:						null
						}

					</div>
				</div>
			</div>
			{
				!isEmpty(list) || loading
					? (
						<div className={styles.container}>
							<Table columns={toggleValue ? columns2 : columns1} data={list || []} loading={loading} />
						</div>

					)
					:	<EmptyState />
			}
			<ActivityModal show={show} item={item} onClose={handleClose} />
			<Modal size="md" show={show1} onClose={() => setShow1(false)} placement="center">
				<Modal.Header title="Update this Reimbursement" />
				<Modal.Body>
					<div style={{ width: '100%' }}>
						<Textarea
							size="sm"
							style={{ marginRight: '8px', margin: '0 8px 8px 0', padding: '8px' }}
							placeholder="Enter your remarks here"
							value={remark_text}
							onChange={(val) => setRemarkText(val)}
						/>
					</div>

				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => handleUpdateReimbursement()}>OK</Button>
				</Modal.Footer>
			</Modal>
			<Pagination
				type="table"
				currentPage={page}
				onPageChange={handlePagination}
				totalItems={total_count}
				pageSize={page_limit}
				className={styles.pagination_container}
			/>
		</div>
	);
}
export default ExpenseHistory;
