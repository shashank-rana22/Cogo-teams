import { useState, useContext, useEffect } from 'react';
import { Button, Modal } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import EmptyState from '../../../common/EmptyState';
import DashboardContext from '../../../context/DashboardContext';
import useBulkUpdateSO2 from '../../../hooks/useBulkUpdateSO2';
import Card from './Card';
import ListPagination from './ListPagination';
import styles from './styles.module.css';

function ShipmentList({ loading, data = {} }) {
	const { activeTab, setFilters, filters } = useContext(DashboardContext);
	const { apiTrigger } = useBulkUpdateSO2();

	const { list = [] } = data || {};
	const [checkedRows, setCheckedRows] = useState(new Set());
	const [allocatedSo2, setAllocatedSo2] = useState();
	const [show, setShow] = useState(false);

	const handAllocate = () => {
		apiTrigger({ checkedRows, allocatedSo2, setCheckedRows });
		setFilters({ ...filters });
		setShow(false);
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

	return (
		<div>
			{!loading && isEmpty(list)
				? <EmptyState />
				: (
					<>
						<Pagination />

						{(list || [])?.map((item) => (
							<Card
								item={item}
								checkedRows={checkedRows}
								setCheckedRows={setCheckedRows}
								key={item.id}
								activeTab={activeTab}
							/>
						))}
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
										<Button themeType="tertiary" onClick={() => { setShow(false); }}>Cancel</Button>
										<Button onClick={handAllocate}>Reallocate</Button>
									</Modal.Footer>
								</Modal>
							)}
					</>
				)}
		</div>
	);
}
export default ShipmentList;
