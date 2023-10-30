import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import React, { useState } from 'react';

import usePostToSage from '../../hooks/usePostToSage';

import CancellationModal from './CancellationModal';
import Content from './Content';

const TIME_VALUE = 86400000;

function IRNCancel({ itemData, refetch }) {
	const [showCancellationModal, setShowCancellationModal] = useState(false);

	const {
		invoiceStatus,
		id,
		entityCode,
		irnGeneratedAt,
		invoiceAdditionals = {},
	} = itemData || {};

	const statusPresent = ['IRN_GENERATED', 'FAILED', 'IRN_CANCELLED'].includes(
		invoiceStatus,
	);
	const { postToSage, loading } = usePostToSage({ id, refetch });

	const { irn_label: irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;

	const sageAllowed =	ENTITY_FEATURE_MAPPING[entityCode]?.feature_supported?.includes(
		'post_to_sage',
	);
	const cancelSupported =	ENTITY_FEATURE_MAPPING[entityCode]?.feature_supported?.includes(
		'cancel_e_invoice',
	);

	const cancelApproved =	(cancelSupported && invoiceAdditionals?.reqCancelReason)
		|| (!cancelSupported
			&& (irnGeneratedAt !== null
				? Number(irnGeneratedAt) + TIME_VALUE >= Date.now()
				: false));

	const hasOptions =		cancelApproved
		|| (statusPresent && sageAllowed)
		|| invoiceAdditionals?.reqCancelReason;

	if (
		cancelApproved
		|| statusPresent
		|| invoiceAdditionals?.reqCancelReason
	) {
		return hasOptions ? (
			<>
				<Content
					cancelApproved={cancelApproved}
					statusPresent={statusPresent}
					sageAllowed={sageAllowed}
					loading={loading}
					postToSage={postToSage}
					setShowCancellationModal={setShowCancellationModal}
					irnLabel={irnLabel}
				/>
				{showCancellationModal ? (
					<CancellationModal
						itemData={itemData}
						showCancellationModal={showCancellationModal}
						setShowCancellationModal={setShowCancellationModal}
						irnLabel={irnLabel}
						refetch={refetch}
					/>
				) : null}
			</>
		) : 'N/A';
	}
}

export default IRNCancel;
