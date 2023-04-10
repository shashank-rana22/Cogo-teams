import { Modal, Button, Table, Pagination } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import useGetUploadList from '../../../../../hooks/useGetUploadList';

import styles from './styles.module.css';

function UploadListModal({ tableModal = '', setTableModal = () => {}, row = {} }) {
	const { id = '', request_files = {} } = row;
	const { columns, onPageChange, data, loading } = useGetUploadList(id);
	const { list = [], page = 0, page_limit, total_count } = data || {};
	const onClose = () => {
		setTableModal('');
	};

	const onSubmit = () => {
		setTableModal('reUpload');
	};

	if (isEmpty(list) && !loading) {
		return (
			<Modal size="lg" show={tableModal === 'uploadList'} onClose={onClose} placement="center">
				<Modal.Header title={(
					<div className={styles.header}>
						<IcMUpload style={{ margin: '0 4px 0 0' }} />
						Upload List
					</div>
				)}
				/>

				<Modal.Footer>
					<div className={styles.empty}>
						<EmptyState height="200px" width="720px" />
					</div>
					<div className={styles.close_button}>
						<Button themeType="secondary" onClick={onClose}>Close</Button>
					</div>
				</Modal.Footer>
			</Modal>

		);
	}

	return (

		<Modal key={tableModal} size="lg" show={tableModal} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div className={styles.header}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					Upload List
				</div>
			)}
			/>

			<Modal.Body>
				<div className={styles.container}>
					<Table
						className={styles.table}
						columns={columns}
						data={list || []}
						loading={loading}
					/>

				</div>
				{total_count > page_limit && (
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count || 10}
							pageSize={page_limit || 5}
							onPageChange={onPageChange}
						/>
					</div>
				)}
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

				{(request_files?.errored_data_url)
					? (
						<Button
							disabled={loading}
							themeType="secondary"
							onClick={() => onSubmit()}
						>
							Re-Upload
						</Button>
					) : ''}

			</Modal.Footer>
		</Modal>
	);
}

export default UploadListModal;
