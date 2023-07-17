import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import usePostToSage from '../../hooks/usePostToSage';

import CancellationModal from './CancellationModal';
import Content from './content';
import styles from './styles.module.css';

const TIME_VALUE = 86400000;

type InvoiceAdditionals = {
	reqCancelReason?:string
};

type ItemData = {
	id?: string;
	invoiceStatus?: string;
	entityCode?: number;
	irnGeneratedAt?: string;
	isRevoked?: boolean;
	invoiceAdditionals?: InvoiceAdditionals
};
interface INRCancel {
	itemData?: ItemData;
	refetch?: Function;
}

function IRNCancel({ itemData, refetch }: INRCancel) {
	const [showCancellationModal, setShowCancellationModal] = useState(false);
	const [show, setShow] = useState(false);

	const { invoiceStatus, id, entityCode, irnGeneratedAt, invoiceAdditionals = { } } = itemData || {};
	const statusPresent = ['IRN_GENERATED', 'FAILED'].includes(invoiceStatus);

	const { postToSage, loading } = usePostToSage({ id });

	const irnLabel = GLOBAL_CONSTANTS.cogoport_entities[entityCode].labels;

	const sageAllowed = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('post_to_sage');
	const cancelSupported = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]
		?.feature_supported?.includes('cancel_e_invoice');

	const cancelApproved = (cancelSupported && invoiceAdditionals?.reqCancelReason)
		|| (!cancelSupported && (irnGeneratedAt !== null ? Number(irnGeneratedAt) + TIME_VALUE >= Date.now() : false));

	const hasOptions = (cancelApproved) || (statusPresent && sageAllowed);

	const rest = {
		onClickOutside: () => setShow(false),
	};

	if (
		(cancelApproved) || (statusPresent)
	) {
		return (
			hasOptions
				? (
					<div className={styles.div_container}>
						<Popover
							placement="left"
							visible={show}
							render={(
								<Content
									cancelApproved={cancelApproved}
									statusPresent={statusPresent}
									sageAllowed={sageAllowed}
									loading={loading}
									postToSage={postToSage}
									setShowCancellationModal={setShowCancellationModal}
									setShow={setShow}
									irnLabel={irnLabel}
								/>
							)}
							{...rest}
						>
							<div>
								<IcMOverflowDot
									onClick={() => setShow(!show)}
									style={{ cursor: 'pointer' }}
									width="16px"
									height="16px"
								/>
							</div>
						</Popover>

						{showCancellationModal && (
							<CancellationModal
								itemData={itemData}
								showCancellationModal={showCancellationModal}
								setShowCancellationModal={setShowCancellationModal}
								IRNLabel={irnLabel}
								refetch={refetch}
							/>
						)}
					</div>
				)
				: null
		);
	}

	return null;
}

export default IRNCancel;
