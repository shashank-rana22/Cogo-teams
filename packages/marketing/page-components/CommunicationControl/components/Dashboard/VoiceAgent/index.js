import { Button, Placeholder, Table } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import TableView from '../../../common/TableView';
import useBulkUpdateServetalAgents from '../../../hooks/useBulkUpdateServetalAgents';
import useCreateServetalAgent from '../../../hooks/useCreateServetalAgent';
import useGetListServetalAgent from '../../../hooks/useGetListServetalAgent';

import columns from './Columns';
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

	const getPayload = () => {
		const agents = checkedRowsSerialId.map((item) => ({
			agent_name   : item?.agent_data?.name,
			agent_number : item?.mobile_number,
			id           : item?.id,
			action_type  : 'delete_agent',
		}));

		return { agents };
	};

	const { bulkUpdateAgents = () => {}, deleteLoading = '' } = useBulkUpdateServetalAgents();

	const deleteHandler = () => {
		bulkUpdateAgents({ setDeleteAgentsModal, listServetalAgent, payload: getPayload() });
		setDeleteAgentsModal(false);
	};

	const { servetalAgent = () => {}, createServetalAgentloading = '' } = useCreateServetalAgent({ listServetalAgent });

	const cols = columns({
		checkedRowsSerialId,
		setCheckedRowsSerialId,
		listServetalAgent,
	});

	const loadingColumn = [
		{
			Header   : 'LOADING...',
			accessor : (item) => (
				<Placeholder key={item?.id} height="50px" />
			),
		},
	];

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
						servetalAgent={servetalAgent}
						loading={createServetalAgentloading}
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
						disabled={deleteLoading || isEmpty(checkedRowsSerialId)}
						className={styles.btn}
						onClick={() => setDeleteAgentsModal(true)}
					>
						DELETE ALL
					</Button>
					<DeleteAgentsModal
						deleteAgentsModal={deleteAgentsModal}
						checkedRowsSerialId={checkedRowsSerialId}
						setDeleteAgentsModal={setDeleteAgentsModal}
						deleteHandler={deleteHandler}
					/>
				</div>
			</div>
			{loading ? (
				<div className={styles.table_container}>
					<Table
						columns={loadingColumn}
						data={[{}, {}, {}]}
					/>
				</div>
			) : (
				<TableView
					columns={cols}
					data={data}
					pagination={pagination}
					setPagination={setPagination}
					loading={loading}
				/>
			)}
		</div>
	);
}
export default VoiceAgent;
