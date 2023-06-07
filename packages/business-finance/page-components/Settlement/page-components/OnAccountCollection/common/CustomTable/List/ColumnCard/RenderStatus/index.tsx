import { Pill } from '@cogoport/components';
import React from 'react';

const STATUS_MAPPING = {
	CREATED        : <Pill size="md" color="orange"> Uploaded</Pill>,
	DELETED        : <Pill size="md" color="red">Deleted</Pill>,
	APPROVED       : <Pill size="md" color="green">Approved</Pill>,
	POSTED         : <Pill size="md" color="green">Posted</Pill>,
	POSTING_FAILED : <Pill size="md" color="red">Posting Failed</Pill>,
	FINAL_POSTED   : <Pill size="md" color="green">Final Posted</Pill>,
};

function RenderStatus({ item }) {
	const { paymentDocumentStatus = '' } = item || {};

	return (
		<div>
			{STATUS_MAPPING[paymentDocumentStatus]}
		</div>
	);
}

export default RenderStatus;
