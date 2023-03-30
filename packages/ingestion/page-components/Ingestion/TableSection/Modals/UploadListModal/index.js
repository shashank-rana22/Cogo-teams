import { Modal, Button, Table, Pagination } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import useGetUploadList from '../../../../../hooks/useGetUploadList';

import styles from './styles.module.css';

function UploadListModal({ tableModal, setTableModal = () => {}, row = {} }) {
	console.log('row', row?.id);
	const { columns, dummyData, onPageChange, currentPage, data } = useGetUploadList(row?.id);
	const { list = [], page = 0, page_limit, total_count, loading } = data || {};
	const onClose = () => {
		setTableModal(false);
	};

	// const loading = false;

	const onChoose = () => {

	};
	return (
		<Modal size="l" show={tableModal} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMDownload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Upload List
				</div>
			)}
			/>
			<Modal.Body>
				<div>
					<Table
						className={styles.table}
						columns={columns}
						data={list || []}
						loading={loading}
					/>

					{total_count > page_limit && (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={currentPage}
								totalItems={total_count || 0}
								pageSize={page_limit || 8}
								onPageChange={onPageChange}
							/>
						</div>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>
				{/* <Button themeType="primary" onClick={onClose}>Re-Upload</Button> */}

			</Modal.Footer>
		</Modal>
	);
}

export default UploadListModal;
