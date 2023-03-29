import { Button, Modal, Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../../../common/Columns';
import UserTableData from '../../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../../constants/feedback-data-columns';
import useCreateLog from '../../../../../../hooks/useCreateLog';
import useListReportees from '../../../../../../hooks/useListReportees';
import useGetControls from '../../../../../../utils/filterControls';
import DecisionModal from '../UpdateModal/DecisionModal';

import styles from './styles.module.css';

function CreateModal({
	item = {},
	source = 'log_modal',
	modal,
	setModal = () => {},
	setItem = () => {},
	disableNext,
	setDisableNext = () => {},
	setRefetchList = () => {},
}) {
	const [searchValue, setSearchValue] = useState('');
	const [managerName, setManagerName] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();
	const [status, setStatus] = useState('');
	const {
		feedbackData,
		loading = false,
		setPage,
	} = useListReportees({
		searchValue: query,
	});

	const { onSubmitCreate = () => {} } = useCreateLog();

	const { list: newTeamList = [], pagination_data = {} } = feedbackData;
	const { total_count = '', page_limit = '', page = '' } = pagination_data;

	useEffect(() => debounceQuery(searchValue, managerName), [debounceQuery, searchValue, managerName]);

	const managerControls = useGetControls({ name: 'manger_name' });

	const columnsToShow = [
		...(source === 'log_modal' ? feedbackDataColumns.logModal : feedbackDataColumns.manualFeedbacks)];
	const columns = useGetColumns({ columnsToShow, source, setItem });

	const clickedBack = () => {
		if (status === '') { setModal(''); }
		if (isEmpty(item)) {
			setStatus('');
		} else {
			setItem({});
		}
	};

	return (
		(source === 'log_modal' ? (
			<Modal
				show={modal === 'create'}
				onClose={() => {
					setModal('');
					setItem({});
					setStatus('');
				}}
				size="lg"
			>
				<Modal.Header title={`Create ${startCase(status)}`} />
				<div className={styles.upload_modal}>
					<Modal.Body
						style={{ maxHeight: '500px' }}
					>
						{!status ? (
							<div>
								<p style={{ padding: '8px' }}>Do you wish to create new Probation or PIP</p>
								<div className={styles.pip_select}>
									<Button
										size="xl"
										className={styles.pip_select_btn}
										themeType="secondary"
										onClick={() => setStatus('probation')}
										style={{ width: '120px' }}
									>
										Probations
									</Button>

									<Button
										size="xl"
										className={styles.pip_select_btn}
										themeType="secondary"
										onClick={() => setStatus('pip')}
										style={{ width: '120px' }}
									>
										PIP
									</Button>
								</div>
							</div>
						) : (
							<div>
								{isEmpty(item) ? (
									<>
										<div className={styles.name_input}>
											<div>
												<div>Search by Name/COGO-ID...</div>
												<Input
													placeholder="Type Here..."
													value={searchValue}
													onChange={setSearchValue}
												/>

											</div>
											<div>
												<div>Search by Manager...</div>
												<Input
													{...managerControls}
													onChange={setManagerName}
													style={{ marginRight: '8px' }}
												/>

											</div>
										</div>
										<UserTableData
											columns={columns}
											list={newTeamList}
											loading={loading}
											pagination={page}
											page_limit={page_limit}
											total_count={total_count}
											setPagination={setPage}
										/>
									</>
								) : (
									<DecisionModal
										item={item}
										setItem={setItem}
										status={status}
										type="create"
										setDisableNext={setDisableNext}
									/>
								)}

							</div>
						)}
					</Modal.Body>
				</div>
				<Modal.Footer>
					<Button
						size="md"
						themeType="tertiary"
						onClick={clickedBack}
					>
						{status ? 'Back' : 'Close'}

					</Button>

					{!isEmpty(item) && (
						<Button
							size="md"
							style={{ marginLeft: '8px' }}
							onClick={() => {
								onSubmitCreate(item, status, setRefetchList, setModal);
							}}
							disabled={disableNext}
						>
							Submit
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		) : (
			<>
				<div className={styles.name_input}>
					<div>
						<div>Search by Name/COGO-ID...</div>
						<Input
							placeholder="Type Here..."
							value={searchValue}
							onChange={setSearchValue}
						/>

					</div>
					<div>
						<div>Search by Name/COGO-ID...</div>
						<Input
							{...managerControls}
							onChange={setManagerName}
							style={{ marginRight: '8px' }}
						/>

					</div>
				</div>

				<UserTableData
					columns={columns}
					list={newTeamList}
					loading={loading}
					pagination={page}
					page_limit={page_limit}
					total_count={total_count}
					setPagination={setPage}
				/>
			</>
		))
	);
}

export default CreateModal;
