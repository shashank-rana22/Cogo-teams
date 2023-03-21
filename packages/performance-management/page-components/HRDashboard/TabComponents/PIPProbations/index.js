import { Modal, Button } from '@cogoport/components';
import { IcMEdit, IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetColumns from '../../../../common/Columns';
import UserTableData from '../../../../common/UserTableData';
import feedbackDataColumns from '../../../../constants/feedback-data-columns';
import useListEmployees from '../../../../hooks/useListEmployees';
import UploadModalBody from '../../UploadModal';

import LogModal from './LogModal';
import styles from './styles.module.css';

function PIPProbations({ source = 'hr_dashboard' }) {
	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [item, setItem] = useState({});

	const { employeeData = {}, loading = false, params, setPage } = useListEmployees({});

	// useEffect(() => debounceQuery(searchValue), [searchValue]);

	const columnsToShow = feedbackDataColumns.pipProbationList;
	const columns = useGetColumns({ columnsToShow, setItem, source, setOpenUpdate });

	const dataList = {
		1: [{
			name            : 'apple',
			id              : '1',
			designation     : 'fruit',
			manager_name    : 'apple_tree',
			employee_status : 'exited',
			is_pip          : true,
		},
		{
			name            : 'mango',
			id              : '2',
			designation     : 'fruit',
			manager_name    : 'mango_tree',
			employee_status : 'employed',
			is_pip          : true,
		}],
		2: [{
			name            : 'lemon',
			id              : '3',
			designation     : 'fruit',
			manager_name    : 'lemon_tree',
			employee_status : 'probation',
			is_pip          : false,
		},
		{
			name            : 'carrot',
			id              : '5',
			designation     : 'vegetable',
			manager_name    : 'carrot_plant',
			employee_status : 'probation',
			is_pip          : true,
		}],
	};

	return (
		<div>
			<div className={styles.button_container}>
				<Button
					size="lg"
					themeType="tertiary"
					style={{ marginRight: '16px' }}
					onClick={() => setOpenUploadModal(true)}
				>
					<IcMUpload style={{ marginRight: '4px' }} />
					Upload CSV
				</Button>

				<Button
					size="lg"
					themeType="secondary"
					onClick={() => setOpenUpdate(true)}
				>
					<IcMEdit style={{ marginRight: '4px' }} />
					Update User Status
				</Button>
			</div>

			<UserTableData
				columns={columns}
				list={dataList[params.Page]}
				pagination={params.Page}
				page_limit={2}
				setPagination={setPage}
				total_count={4}
			/>

			{openUploadModal
				&& (
					<Modal
						show={openUploadModal}
						onClose={() => setOpenUploadModal(false)}
					>
						<Modal.Header title="Upload CSV" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								<UploadModalBody setOpenUploadModal={setOpenUploadModal} />
							</Modal.Body>
						</div>

					</Modal>
				)}

			{openUpdate
				&& (
					<Modal
						show={openUpdate}
						onClose={() => {
							setOpenUpdate(false);
							setItem({});
						}}
						size="lg"
					>
						<Modal.Header title="Log" />
						<div className={styles.upload_modal}>
							<Modal.Body>
								<LogModal setOpenUpdate={setOpenUpdate} item={item} setItem={setItem} />
							</Modal.Body>
						</div>
					</Modal>
				)}
		</div>
	);
}

export default PIPProbations;
