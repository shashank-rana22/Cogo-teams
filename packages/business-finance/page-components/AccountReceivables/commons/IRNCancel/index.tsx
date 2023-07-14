import { Button, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import usePostToSage from '../../hooks/usePostToSage';

import CancellationModal from './CancellationModal';
import styles from './styles.module.css';

const { cogoport_entities: CogoportEntity } = GLOBAL_CONSTANTS || {};

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

	const { labels } = CogoportEntity[entityCode] || {};

	const { irn_label: IRNLabel } = labels || {};

	const sageAllowed = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('post_to_sage');
	const cancelSupported = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]
		?.feature_supported?.includes('cancel_e_invoice');
	const cancelApproved = (cancelSupported && invoiceAdditionals?.reqCancelReason)
		|| (!cancelSupported && (irnGeneratedAt !== null ? Number(irnGeneratedAt) + TIME_VALUE >= Date.now() : false));

	const hasOptions = (cancelApproved) || (statusPresent && sageAllowed);

	function Content() {
		return (
			<div className={styles.container}>
				{ cancelApproved ? (
					<Button
						size="sm"
						type="button"
						onClick={() => {
							setShowCancellationModal(true);
							setShow(false);
						}}
						style={{ marginBottom: '8px' }}
					>
						Cancel
						{' '}
						{IRNLabel}
					</Button>
				) : null}
				{(statusPresent && sageAllowed) ? (
					<Button
						disabled={loading}
						size="sm"
						type="button"
						onClick={postToSage}
					>
						Post to Sage
					</Button>
				) : null}
			</div>
		);
	}

	const rest = {
		onClickOutside: () => setShow(!show),
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
							render={<Content />}
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
								IRNLabel={IRNLabel}
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
