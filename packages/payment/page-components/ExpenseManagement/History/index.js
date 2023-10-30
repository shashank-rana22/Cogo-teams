import { Table, Pagination, Modal, Button, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import useListReimbursements from '../../../hooks/useListReimbursements';
import useUpdateReimbursements from '../../../hooks/useUpdateReimbursements';

import ActivityModal from './ActivityModal';
import getColumns from './getColumns';
import getColumnsManager from './getColumnsManager';
import styles from './styles.module.css';

function ExpenseHistory({ toggleValue, hr_view }) {
	const { loading, data, setFilters, refetchlist } = useListReimbursements({ toggleValue });
	const { updateReiembursement } = useUpdateReimbursements();
	const { list, page, total_count, page_limit } = data || {};
	const [show, setShow] = useState(false);
	const [show1, setShow1] = useState(false);
	const [item, setItem] = useState({});
	const [remark_text, setRemarkText] = useState('');
	const [payload, setPayload] = useState({});

	const handleUpdateReimbursement = async () => {
		// console.log('payload', payload);
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
		// updateReiembursement({ payload, action, refetchlist });
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

					<span className={styles.top_bold_text}>My expense history</span>
					<span className={styles.top_grey_text}>View all you expenses</span>

				</div>
				<div className={styles.header_input}>
					{/* <div className={styles.input_filters}>
						<Select
							size="md"
							placeholder="Status"
							className={styles.select_input}
									// name="payroll_status"
									// control={control}
							value={status}
							options={OPTION_STATUS}
							isClearable
							onChange={(e) => {
								setStatus(e);
								setFilters((prev) => ({ ...prev, payroll_status: e, page: 1 }));
							}}
						/>
					</div>
					<div>
						<Input
							size="md"
							className={styles.input_search}
									// prefix={<IcMAppSearch className={styles.search_icon} width={20} height={20} />}
							placeholder="Search"
							onChange={(e) => handleSearch(e)}
							name="search_payroll"
							value={searchQuery}
						/>
					</div> */}
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
