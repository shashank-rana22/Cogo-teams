import { Pill } from '@cogoport/components';
import React from 'react';

function RenderStatus({ item }) {
	const { paymentDocumentStatus = '' } = item || {};

	const showStatus = () => {
		if (paymentDocumentStatus === 'CREATED') {
			return <Pill size="md" color="green"> Uploaded</Pill>;
		}
		if (paymentDocumentStatus === 'DELETED') {
			return <Pill size="md" color="green">Deleted</Pill>;
		}
		if (paymentDocumentStatus === 'APPROVED') {
			return <Pill size="md" color="green">Approved</Pill>;
		}
		if (paymentDocumentStatus === 'POSTED') {
			return <Pill size="md" color="green">Posted</Pill>;
		}
		if (paymentDocumentStatus === 'POSTING_FAILED') {
			return <Pill size="md" color="green">Posting Failed</Pill>;
		}
		return <Pill size="md" color="green">Final Posted</Pill>;
	};

	return (
		<div>
			{showStatus()}
		</div>
	);
}

export default RenderStatus;
