import { Table, Button, Modal, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../../common/EmptyState';
import Form from '../../../../../common/Form';
import getControls from '../../../configurations/get-reject-request-controls';
import getStatusMapping from '../../../constants/requests-status-mapping';
import useUpdateRequestStatus from '../../../hooks/useUpdateAllocationRequest';

import styles from './styles.module.css';

function List(props) {
	const { t } = useTranslation(['allocation']);

	const {
		data,
		columns,
		loading,
		onChangeParams,
		fetchList,
		requestStatusItem,
		setRequestStatusItem,
	} = props;

	const { list, page = 0, page_limit: pageLimit = 0, total_count = 0 } = data || {};

	const statusMapping = getStatusMapping({ t });

	const controls = getControls({ t });

	const {
		onStatusUpdate,
		loadingUpdate,
		formProps,
	} = useUpdateRequestStatus({ fetchList, setRequestStatusItem, requestStatusItem, t });

	const { handleSubmit } = formProps;

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText={t('allocation:empty_text')}
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	const showStatusConfirmationModal = !isEmpty(requestStatusItem);

	const onCloseModal = () => {
		setRequestStatusItem({});
	};

	return (
		<div>
			<div className={styles.table_container}>
				<Table
					className={styles.table}
					columns={columns}
					data={list || []}
					loading={loading}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={pageLimit}
					onPageChange={(val) => onChangeParams({ page: val })}
				/>
			</div>

			{showStatusConfirmationModal ? (
				<Modal
					size="md"
					show={showStatusConfirmationModal}
					onClose={onCloseModal}
					onOuterClick={onCloseModal}
					placement="top"
				>

					<div>
						<Modal.Header
							title={t('allocation:update_status_header')}
						/>

						<Modal.Body>
							{requestStatusItem.status === 'rejected' ? (

								<div className={styles.rejection_container}>
									{t('allocation:rejection_details')}
									<Form formProps={formProps} controls={controls} />
								</div>
							) : (
								<div>
									{t('allocation:are_you_sure_you_want_to')}
									{' '}
									{statusMapping[requestStatusItem.status].label || t('allocation:update_label')}
									{' '}
									{t('allocation:this_request')}
								</div>
							)}

						</Modal.Body>

						<Modal.Footer>
							<Button
								size="md"
								themeType="primary"
								onClick={handleSubmit(onStatusUpdate)}
								loading={loadingUpdate}
							>
								{t('allocation:yes_button_label')}
							</Button>
						</Modal.Footer>
					</div>

				</Modal>
			) : null}
		</div>

	);
}

export default List;
