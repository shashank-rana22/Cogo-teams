import { Tabs, TabPanel, Button } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import { useState, useMemo } from 'react';

import TableView from '../../../../common/TableView';
import useGetCommunicationChannel from '../../../../hooks/useGetCommunicationChannel';

import getColumns from './Columns';
import styles from './styles.module.css';

const AddModal = dynamic(() => import('./AddModal'), { ssr: false, defer: true });

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

	const defaultParams = useMemo(() => ({
		filters: {
			email_type: emailType || undefined,
		},
		channel: 'email',
	}), [emailType]);

	const {
		data = {}, loading = true, getChannelConfig = () => {},
		pagination = PAGE_ONE, setPagination = () => {},
	} = useGetCommunicationChannel({ defaultParams });

	const refetch = () => {
		setEmail('');
		getChannelConfig();
	};

	const cols = getColumns({
		page      : data?.page,
		pageLimit : data?.page_limit,
		getChannelConfig,
	});

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
							key={item?.value}
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

			<TableView
				columns={cols}
				data={data}
				pagination={pagination}
				setPagination={setPagination}
				loading={loading}
			/>

			{showModal ? (
				<AddModal
					email={email}
					addEmailRefetch={refetch}
					setEmail={setEmail}
					setShowModal={setShowModal}
					showModal={showModal}
					emailType={emailType}
				/>
			) : null}
		</div>
	);
}

export default EmailConfig;
