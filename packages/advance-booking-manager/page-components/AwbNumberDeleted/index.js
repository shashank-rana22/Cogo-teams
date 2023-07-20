import { Button, Tooltip, Modal, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMProvision } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import { functions } from '../../commons/Functions';
import List from '../../commons/List';
import { AwbNumberDeletedFields } from '../../configurations/awb-number-deleted-fields';
import useEditAwbNumber from '../../hooks/useEditAwbNumber';
import ConfirmDelete from '../ConfirmDelete';

import styles from './styles.module.css';

function AwbNumberDeleted({
	data,
	loading,
	awbList,
	setPage,
	page,
	setFinalList,
	finalList,
	setQfilter,
	status,
}) {
	const router = useRouter();
	const [item, setItem] = useState({ id: '' });
	const [showConfirm, setShowConfirm] = useState(false);
	const [changedStatus, setChangedStatus] = useState('');

	const { fields } = AwbNumberDeletedFields;

	const { editAwbNumber, loading:editLoading } = useEditAwbNumber({
		item,
		awbList,
		setPage,
		setFinalList,
		setQfilter,
		setShowConfirm,
		page,
		changedStatus,
	});

	const redirectToShipment = (shipmentId) => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipmentId}`;
		window.open(
			newUrl,
			'_blank',
			'noreferrer',
		);
	};

	const otherFunctions = {
		handleShipments: (singleItem) => {
			const { shipments = [] } = singleItem;

			const handleClick = () => {
				if (shipments?.[GLOBAL_CONSTANTS.zeroth_index]?.id) {
					redirectToShipment(shipments?.[GLOBAL_CONSTANTS.zeroth_index].id);
				}
			};
			return (
				<div>
					<Button
						themeType="linkUi"
						onClick={handleClick}
					>
						{shipments?.[GLOBAL_CONSTANTS.zeroth_index]?.serialId || '-'}
					</Button>
				</div>
			);
		},
		handleAction: (singleItem) => (
			<div className={styles.tooltip_container}>
				<Tooltip
					content="Recover AWB Number"
					placement="top"
					interactive
				>
					<ButtonIcon
						themeType="primary"
						onClick={() => {
							setItem(singleItem);
							setShowConfirm(true);
							setChangedStatus('available_non_reserved');
						}}
						icon={<IcMProvision height={16} width={16} fill="#8B8B8B" />}
					/>
				</Tooltip>
			</div>
		),
	};

	const allFunctions = { ...functions, ...otherFunctions };

	return (
		<div className={styles.awbnumber_container}>
			<List
				fields={fields}
				data={data}
				loading={loading}
				functions={allFunctions}
				page={page}
				setPage={setPage}
				finalList={finalList}
				setFinalList={setFinalList}
				status={status}
			/>
			{showConfirm && (
				<Modal
					show={showConfirm}
					onClose={() => setShowConfirm(false)}
					className={styles.modal_container}
				>
					<ConfirmDelete
						setShowConfirm={setShowConfirm}
						editAwbNumber={editAwbNumber}
						loading={editLoading}
						status={status}
					/>
				</Modal>
			)}
		</div>
	);
}
export default AwbNumberDeleted;
