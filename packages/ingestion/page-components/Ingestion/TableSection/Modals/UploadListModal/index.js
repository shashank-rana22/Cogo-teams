import { Modal, Button, Table, Pagination } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import useGetUploadList from '../../../../../hooks/useGetUploadList';

import styles from './styles.module.css';

function UploadListModal({ tableModal, setTableModal = () => {}, row = {} }) {
	const { columns, onPageChange, data, loading } = useGetUploadList(row?.id);
	const { list, page = 0, page_limit, total_count } = data || {};
	const onClose = () => {
		setTableModal('');
	};

	const onSubmit = () => {
		setTableModal('reUpload');
	};

	// Todo Test pagination here

	if (isEmpty(list) && !loading) {
		return (
			<Modal size="l" show={tableModal === 'uploadList'} onClose={onClose} placement="center">
				<Modal.Header title={(
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<IcMDownload style={{ margin: '0 4px 0 0' }} />
						{' '}
						Upload Listrkjbvr
					</div>
				)}
				/>
				<Modal.Body>
					<div className={styles.empty}>
						<EmptyState height="200px" width="720px" />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="secondary" onClick={onClose}>Close</Button>
					{/* <Button themeType="primary" onClick={onClose}>Re-Upload</Button> */}

				</Modal.Footer>
			</Modal>

		);
	}

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
								type="number"
								currentPage={page}
								totalItems={total_count || 0}
								pageSize={page_limit || 8}
								onPageChange={onPageChange}
							/>
						</div>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					style={{ marginRight: '8px' }}
					disabled={loading}
					themeType="secondary"
					onClick={onClose}
				>
					Close

				</Button>
				<Button disabled={loading} themeType="secondary" onClick={() => onSubmit()}>Re-Upload</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default UploadListModal;
