import { Button } from '@cogoport/components';
import { IcMDownload, IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { ApprovalPendingFields } from '../../configurations/approval_pending_fields';

import DownloadModal from './DownloadModal';

function ApprovalPending({ data, loading }) {
	const { fields } = ApprovalPendingFields;
	const [show, setShow] = useState(false);
	const functions = {
		handleDownload: () => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => { setShow(true); }}
			>
				<IcMDownload fill="#8B8B8B" />

			</Button>
		),
		handleEdit: () => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => { setShow(true); }}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
	};
	return (
		<>
			<List fields={fields} data={data} loading={loading} functions={functions} />
			{show && <DownloadModal show={show} setShow={setShow} />}
		</>
	);
}

export default ApprovalPending;
