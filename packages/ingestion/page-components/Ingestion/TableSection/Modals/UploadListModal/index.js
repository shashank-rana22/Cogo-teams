import { Modal, Button, Table, Pagination } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import useGetUploadList from '../../../../../hooks/useGetUploadList';

import styles from './styles.module.css';

function UploadListModal({ tableModal = '', setTableModal = () => {}, row = {} }) {
	const { id = '', request_files = {} } = row;
	const { columns, onPageChange, data, loading } = useGetUploadList(id);
	const { list = [], page = 1, page_limit, total_count } = data || {};
	const onClose = () => {
		setTableModal('');
	};

	const onSubmit = () => {
		setTableModal('re_upload');
	};

	return (

		<Modal
			className={styles.page_container}
			key={tableModal}
			size="xl"
			show={tableModal}
			onClose={onClose}
			placement="center"
		>
			<Modal.Header title={(
				<div className={styles.header}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					Upload List
				</div>
			)}
			/>

			<Modal.Body>

				{(isEmpty(list) && !loading) ? <EmptyState height="200px" width="720px" />
					: 	(
						<div>
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
										totalItems={total_count || 0}
										pageSize={page_limit || 5}
										onPageChange={onPageChange}
									/>
								</div>
							)}
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

				{!(request_files?.stage === 'completed')
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
