import { Button, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import usePostToSage from '../../hooks/usePostToSage';

import CancellationModal from './CancellationModal';
import styles from './styles.module.css';

const { cogoport_entities: CogoportEntity } = GLOBAL_CONSTANTS || {};

const TIME_VALUE = 86400000;

type ItemData = {
	id?: string;
	invoiceStatus?: string;
	entityCode?: number;
	irnGeneratedAt?: string;
	isRevoked?: boolean;
};
interface INRCancel {
	itemData?: ItemData;
	refetch?: Function;
}

function IRNCancel({ itemData, refetch }: INRCancel) {
	const [showCancellationModal, setShowCancellationModal] = useState(false);
	const [show, setShow] = useState(false);

	const { invoiceStatus, id, entityCode, irnGeneratedAt, isRevoked } = itemData || {};

	const isAfterADay =	irnGeneratedAt !== null
		? Number(irnGeneratedAt) + TIME_VALUE >= Date.now()
		: false;

	const { postToSage, loading } = usePostToSage({ id });

	const { labels } = CogoportEntity[entityCode] || {};

	const { irn_label: IRNLabel } = labels || {};

	const entityFeatures = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('is_revoked');

	const GET_ENTITY = (isRevoked && entityFeatures) || !entityFeatures;

	const content = () => (
		<div className={styles.container}>
			{ isAfterADay && GET_ENTITY && (
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
			)}
			{(['IRN_GENERATED', 'FAILED'].includes(invoiceStatus)) && (
				<Button
					disabled={loading}
					size="sm"
					type="button"
					onClick={postToSage}
				>
					Post to Sage
				</Button>
			)}
		</div>
	);

	if (
		(isAfterADay)
		|| (['IRN_GENERATED', 'FAILED'].includes(invoiceStatus))
	) {
		return (
			<div className={styles.div_container}>
				<Popover
					placement="left"
					visible={show}
					render={content()}
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
		);
	}

	return null;
}

export default IRNCancel;
