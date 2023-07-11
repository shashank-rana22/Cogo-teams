import { Button, Modal, Checkbox } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/geo/IN';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext, useEffect } from 'react';

import EmptyState from '../../../common/EmptyState';
import DashboardContext from '../../../context/DashboardContext';
import useBulkUpdateSO2 from '../../../hooks/useBulkUpdateSO2';

import Card from './Card';
import ListPagination from './ListPagination';
import styles from './styles.module.css';

const isSelectable = (activeTab) => !['completed_shipment', 'cancelled_shipment'].includes(activeTab);
const REALLOCATE_ELIGIBLE_PERSONS = [GLOBAL_CONSTANTS.uuid.super_admin_id, GLOBAL_CONSTANTS.uuid.prod_process_owner];

function ShipmentList({ loading = false, data = {} }) {
	const role_id = useSelector((state) => state?.profile?.auth_role_data?.id);
	const { activeTab, setFilters, filters } = useContext(DashboardContext);
	const { apiTrigger, loading: reallocateLoading } = useBulkUpdateSO2();

	const { list = [] } = data || {};
	const [checkedRows, setCheckedRows] = useState(new Set());
	const [allocatedSo2, setAllocatedSo2] = useState();
	const [show, setShow] = useState(false);

	const handAllocate = async () => {
		apiTrigger({
			checkedRows,
			allocatedSo2,
			callback: () => {
				setCheckedRows(new Set());
				setFilters({ ...filters });
				setShow(false);
			},
		});
	};
	function Pagination() {
		return (
			<div className={styles.pagination_container}>
				<ListPagination data={data} />
			</div>
		);
	}
	useEffect(() => {
		setCheckedRows(new Set());
	}, [activeTab, setCheckedRows]);

	const isCardSelectable = !!isSelectable(activeTab);

	return (
		<div>
			{!loading && isEmpty(list)
				? <EmptyState />
				: (
					<>
						<div className={styles.list_controller}>
							{isCardSelectable ? (
								<div>
									<Checkbox
										label="Select All"
										checked={!isEmpty(list)
								&& checkedRows?.size === list?.length}
										onChange={(e) => (e?.target?.checked ? setCheckedRows(
											new Set(list?.map((item) => item?.id)),
										) : setCheckedRows(new Set()))}
									/>
								</div>
							) : <div />}
							<Pagination />
						</div>

						{(list || [])?.map((item) => (
							<Card
								item={item}
								checkedRows={checkedRows}
								setCheckedRows={setCheckedRows}
								key={item.id}
								activeTab={activeTab}
								isSelectable={isCardSelectable}
							/>
						))}
						{
						REALLOCATE_ELIGIBLE_PERSONS.includes(role_id) && isCardSelectable && 	(
							<div className={styles.action_buttons}>
								<Button
									size="lg"
									onClick={() => { setCheckedRows(new Set()); }}
									themeType="tertiary"
								>
									<div className={styles.action_text}>Clear</div>
								</Button>

								<Button
									size="lg"
									onClick={() => { setShow(true); }}
								>
									<div className={styles.action_text}>Reallocate</div>
								</Button>
							</div>
						)
						}

						<Pagination />
						{show
							&& (
								<Modal size="sm" show={show} placement="center" onClose={() => { setShow(false); }}>
									<Modal.Header title="Reallocate Task to SO2" />
									<Modal.Body>

										<div style={{ padding: 16, width: '100%', minHeight: '150px' }}>
											<AsyncSelect
												value={allocatedSo2}
												onChange={(val) => setAllocatedSo2(val)}
												placeholder="Select SO2"
												asyncKey="partner_users_ids"
												params={{
													filters: {
														status: 'active',
													},
												}}
												isClearable
												size="sm"
											/>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<Button
											themeType="tertiary"
											disabled={reallocateLoading}
											onClick={() => { setShow(false); }}
										>
											Cancel
										</Button>
										<Button onClick={handAllocate} disabled={reallocateLoading}>Reallocate</Button>
									</Modal.Footer>
								</Modal>
							)}
					</>
				)}
		</div>
	);
}
export default ShipmentList;
