import { Popover, Button } from '@cogoport/components';
import { IcMOverflowDot, IcMProvision } from '@cogoport/icons-react';
import useGetPermission from '@cogoport/request/hooks/useGetPermission';
import React, { useState } from 'react';

import useGetActions from '../../../hooks/useGetActions';
import CC from '../../../utils/conditionConstants';

import FillRemarksContents from './FillRemarksContent';
import RemarkContent from './RemarkContent';
import RemarksModal from './RemarksModal';
import styles from './styles.module.css';

function Remark({ itemData = {}, checkRelease = false, refetch = () => {}, hideIcDot = false }) {
	const {
		remarkLoading,
		fetchRemarkHistory,
		remarkData,
	} = useGetActions({
		itemData,
	});
	const [remarksModal, setRemarksModal] = useState(false);
	const [actionType, setActionType] = useState('');
	const { invoiceNumber = '' } = itemData || {};

	const { isConditionMatches } = useGetPermission();
	const isReleaseButtonAllowed = isConditionMatches(CC.SEE_RELEASE_ACTION);
	const isActionsButtonAllowed = isConditionMatches(CC.SEE_ACTIONS, 'or');

	const onChange = (action = '') => {
		setRemarksModal(true);
		setActionType(action);
	};

	return (
		<div className={styles.flex}>
			<Popover
				theme="light"
				interactive
				animation="shift-toward"
				placement="left"
				content={(
					<RemarkContent
						remarkData={remarkData}
						remarkLoading={remarkLoading}
					/>
				)}
			>
				<IcMProvision
					onClick={fetchRemarkHistory}
					style={{ cursor: 'pointer' }}
					height={24}
					width={24}
					color="#F68B21"
				/>
			</Popover>

			{checkRelease && isReleaseButtonAllowed ? (
				<Button
					onClick={() => onChange('RELEASE')}
					themeType="secondary"
					className={styles.release_button}
				>
					Release
				</Button>
			) : null}

			{!checkRelease && isActionsButtonAllowed && !hideIcDot ? (
				<Popover
					interactive
					placement="left"
					content={(
						<FillRemarksContents
							onChange={onChange}
						/>
					)}
				>
					<IcMOverflowDot
						size={2}
						style={{ cursor: 'pointer' }}
						height={20}
						width={20}
					/>
				</Popover>
			) : null}

			{remarksModal ? (
				<RemarksModal
					actionType={actionType}
					setRemarksModal={setRemarksModal}
					invoiceNumber={invoiceNumber}
					refetch={refetch}
					itemData={itemData}
				/>
			) : null}
		</div>
	);
}

export default Remark;
