import { Button } from '@cogoport/components';
import React from 'react';

import usegetSageInformation from '../../../../../../../hooks/usegetSageInformation';

import SageInformation from './SageInformation';

function InformationModal({ id, showModal, setShowModal }) {
	const {
		finalPostFromSage,
		finalPostLoading,
		getSageInvoiceData,
		sageInvoiceData,
		sageInvoiceLoading,
		postToSage,
	} = usegetSageInformation({ id });

	return (
		<div>
			<Button size="sm" onClick={() => { setShowModal(!showModal); getSageInvoiceData(); }}>Information</Button>
			<SageInformation
				showModal={showModal}
				setShowModal={setShowModal}
				finalPostFromSage={finalPostFromSage}
				finalPostLoading={finalPostLoading}
				sageInvoiceData={sageInvoiceData}
				sageInvoiceLoading={sageInvoiceLoading}
				postToSage={postToSage}
			/>
		</div>
	);
}

export default InformationModal;
