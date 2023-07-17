import { Pagination, Checkbox, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../../../common/EmptyState';
import Card from '../Card';
import { EditInvoiceIndex } from '../context';

import styles from './styles.module.css';

export default function ShipmentList({
	data = {}, loading = false, activeTab = '', setFilters = () => {},
	setShowModal = () => {},
	handleDisableInvoices = () => {},
}) {
	const { list = [], page, total_count, page_limit } = data || {};
	const { selectedInvoices, setSelectedInvoices } = useContext(EditInvoiceIndex);

	const renderPagination = (
		<div className={styles.pagination_container}>
			<Pagination
				type="table"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
			/>
		</div>
	);

	return !loading && isEmpty(list)
		? <EmptyState />
		: (
			<>
				<div className={styles.list_header}>
					<div className={styles.action_wrapper}>
						<Checkbox
							label="Select All"
							onChange={(e) => {
								if (e?.target?.checked) {
									const tempSelectedInvoices = new Map(list
										?.map((shipment) => [`${shipment?.id}@${shipment?.serial_id}`, new Map(
											shipment?.invoice_combinations
												?.map((invoice) => [
													`${shipment?.id}@${invoice?.invoice_number}#${invoice?.id}`,
													invoice,
												]),
										)]));
									setSelectedInvoices(tempSelectedInvoices);
								} else setSelectedInvoices(new Map());
							}}
						/>
						<Button
							disabled={!selectedInvoices?.size}
							style={{ marginLeft: '1rem' }}
							onClick={() => {
								setShowModal(true);
							}}
						>
							Enable
						</Button>
						<Button
							disabled={!selectedInvoices?.size}
							style={{ marginLeft: '1rem' }}
							onClick={handleDisableInvoices}
						>
							Disable
						</Button>
					</div>
					{renderPagination}
				</div>

				{list?.map((item) => <Card data={item} key={item?.id} activeTab={activeTab} isSelectable />)}
				{renderPagination}
			</>
		);
}
