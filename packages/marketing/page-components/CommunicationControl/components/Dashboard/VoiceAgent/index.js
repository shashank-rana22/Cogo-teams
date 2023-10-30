import { Button } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import TableView from '../../../common/TableView';
import useGetListServetalAgent from '../../../hooks/useGetListServetalAgent';

import getColumns from './Columns';
import CreateAgentModal from './CreateAgentModal';
import DeleteAgentsModal from './DeleteAgentsModal';
import styles from './styles.module.css';

const PAGE_ONE = 1;

function VoiceAgent() {
	const [partnerUser, setPartnerUser] = useState('');
	const [pagination, setPagination] = useState(PAGE_ONE);
	const [checkedRowsSerialId, setCheckedRowsSerialId] = useState([]);
	const [deleteAgentsModal, setDeleteAgentsModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const {
		data = {}, loading = true,
		listServetalAgent = () => {},
	} = useGetListServetalAgent({ partnerUser, pagination });

	const cols = getColumns({
		checkedRowsSerialId,
		setCheckedRowsSerialId,
		listServetalAgent,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Servetal Agent Management</h1>
				<div className={styles.btn_container}>
					<Button
						className={styles.btn}
						onClick={() => { setShowCreateModal(true); }}
					>
						ADD AGENT
					</Button>
					<CreateAgentModal
						showCreateModal={showCreateModal}
						setShowCreateModal={setShowCreateModal}
						listServetalAgent={listServetalAgent}
					/>
					<AsyncSelect
						type="async_select"
						placeholder="Search Partner Name or Email"
						size="sm"
						isClearable
						value={partnerUser}
						onChange={setPartnerUser}
						asyncKey="partner_users_ids"
						style={{ minWidth: '300px' }}
					/>
					<Button
						disabled={isEmpty(checkedRowsSerialId)}
						className={styles.btn}
						onClick={() => setDeleteAgentsModal(true)}
					>
						DELETE ALL
					</Button>
					<DeleteAgentsModal
						deleteAgentsModal={deleteAgentsModal}
						checkedRowsSerialId={checkedRowsSerialId}
						setDeleteAgentsModal={setDeleteAgentsModal}
						listServetalAgent={listServetalAgent}
					/>
				</div>
			</div>
			<TableView
				columns={cols}
				data={data}
				pagination={pagination}
				setPagination={setPagination}
				loading={loading}
			/>
		</div>
	);
}
export default VoiceAgent;
