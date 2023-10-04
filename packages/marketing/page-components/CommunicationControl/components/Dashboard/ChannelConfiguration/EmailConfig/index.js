import { Tabs, TabPanel, Button, Table, Placeholder, Modal, Input } from '@cogoport/components';
import { useState } from 'react';

import TableView from '../../../../common/TableView';
import useAddEmail from '../../../../hooks/useAddEmail';
import useGetCommunicationChannel from '../../../../hooks/useGetCommunicationChannel';
import useUpdateStatus from '../../../../hooks/useUpdateStatus';

import getColumns from './Columns';
import styles from './styles.module.css';

const PAGE_ONE = 1;

const EMAIL_TYPE = [
	{ label: 'Sender email', value: 'is_sender' },
	{ label: 'Reply to email', value: 'is_reply_to' },
	{ label: 'Return path', value: 'is_return_path' },
];

function EmailConfig() {
	const [emailType, setEmailType] = useState('is_sender');
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState('');

	const DEFAULT_PARAMS = {
		filters: {
			email_type: emailType || undefined,
		},
		channel: 'email',
	};
	const {
		data = {}, loading = true, getChannelConfig = () => {},
		pagination = PAGE_ONE, setPagination = () => {},
	} = useGetCommunicationChannel({ DEFAULT_PARAMS });

	const { updateStatus, updateStatusLoading } = useUpdateStatus({
		getChannelConfig,
		channel: 'email',
	});
	const refetch = () => {
		setEmail('');
		getChannelConfig();
	};
	const { addEmail, addEmailLoading } = useAddEmail({
		refetch,
		emailType,
	});

	const cols = getColumns({
		page      : data?.page,
		pageLimit : data?.page_limit,
		updateStatus,
		updateStatusLoading,
		getChannelConfig,
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
				<Tabs
					activeTab={emailType}
					onChange={setEmailType}
					themeType="tertiary"

				>
					{EMAIL_TYPE.map((item) => (
						<TabPanel
							key={item?.id}
							title={item?.label}
							name={item?.value}
						/>
					))}
				</Tabs>
				<Button
					style={{ fontWeight: 700 }}
					onClick={() => { setShowModal(true); }}
				>
					ADD NEW
				</Button>
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
			<Modal
				placement="top"
				show={showModal}
				onClose={() => { setShowModal(false); }}
			>
				<Modal.Header title="Add new email" />
				<Modal.Body
					style={{ minHeight: 200 }}
				>
					<Input
						size="sm"
						placeholder="Enter a valid Email"
						value={email}
						onChange={setEmail}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						style={{ fontWeight: 700 }}
						disabled={addEmailLoading}
						onClick={() => {
							addEmail(email);
							setShowModal(false);
						}}
					>
						SUBMIT
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default EmailConfig;
