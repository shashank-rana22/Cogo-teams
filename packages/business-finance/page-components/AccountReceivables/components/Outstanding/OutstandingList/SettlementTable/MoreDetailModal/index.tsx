import { Button, Pagination, Modal } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../../commons/styledTable';
import SettlementKnockOffList from '../../../../../configs/SettlementKnockOffList';

import styles from './styles.module.css';

function MoreDetailsModal({ active, setActive, singleData, singleListLoading, globalFilters, setGlobalFilters }) {
	const { list: singleList = [], pageNo, totalRecords } = singleData || {};

	return (
		<div>
			<Modal
				size="xl"
				placement="center"
				scroll={false}
				show={active}
				onClose={() => {
					setActive(false);
				}}
			>
				<Modal.Header title="Knocked Off Documents" />

				<Modal.Body>

					<StyledTable
						data={singleList}
						columns={SettlementKnockOffList()}
						loading={singleListLoading}
					/>
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={pageNo}
							totalItems={totalRecords}
							pageSize={globalFilters.pageLimit}
							onPageChange={(val) => setGlobalFilters({ ...globalFilters, page: val })}
						/>

					</div>
				</Modal.Body>

				{' '}

				<Modal.Footer>
					<div className={styles.button_flex}>

						<Button
							size="sm"
							themeType="primary"
							onClick={() => {
								setActive(false);
							}}
						>
							Cancel
						</Button>
					</div>

				</Modal.Footer>

			</Modal>
		</div>
	);
}

export default MoreDetailsModal;
