import { Button } from '@cogoport/components';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import DeactiveModal from './DeactivateModal';
import StatusUpdateModal from './StatusUpdateModal';
import styles from './styles.module.css';

function Buttons({ data = {}, activeTab = '', setMarginBreakupData = () => {}, refetch = () => {} }) {
	const router = useRouter();
	const [openModal, setOpenModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const handleEdit = () => {
		router.push('/margins/edit/[id]', `/margins/edit/${data?.id}`);
	};
	return (
		<div>
			<div className={styles.flex}>

				<Button
					themeType="secondary"
					onClick={() => handleEdit()}
					style={{ marginRight: '5px' }}
				>
					<IcMEdit style={{ marginRight: '5px' }} />
					EDIT
				</Button>

				<Button
					style={{ marginRight: '5px' }}
					themeType="secondary"
					onClick={() => setOpenModal(true)}
				>
					<IcMDelete style={{ marginRight: '5px' }} />
					{activeTab === 'approval_pending' ? ' REJECT' : ' DEACTIVATE'}
				</Button>

				{activeTab === 'approval_pending' ? (
					<Button
						themeType="secondary"
						onClick={() => setOpenUpdateModal(true)}
					>
						{activeTab === 'approval_pending' ? 'APPROVE' : 'UPDATE STATUS'}
					</Button>
				) : null}
			</div>

			{openModal && (
				<DeactiveModal
					setOpenModal={setOpenModal}
					id={data?.id}
					refetch={refetch}
					setMarginBreakupData={setMarginBreakupData}
					openModal={openModal}
				/>
			) }

			{openUpdateModal && (
				<StatusUpdateModal
					show={openUpdateModal}
					setShow={setOpenUpdateModal}
					id={data?.id}
					refetch={refetch}
					setMarginBreakupData={setMarginBreakupData}
				/>
			) }
		</div>
	);
}
export default Buttons;
