import { Button, Modal, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import { functions } from '../../commons/Functions';
import List from '../../commons/List';
import { AwbNumberUsedFields } from '../../configurations/awb-number-used-fields';
import useEditAwbNumber from '../../hooks/useEditAwbNumber';
import ConfirmDelete from '../ConfirmDelete';
import EditAwbNumber from '../EditAwbNumber';

import styles from './styles.module.css';

function AwbNumberUsed({
	data,
	loading,
	setFinalList,
	finalList,
	page,
	setPage,
	status,
}) {
	const { fields } = AwbNumberUsedFields;
	const router = useRouter();

	const [item, setItem] = useState({ id: '' });
	const [showEdit, setShowEdit] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [changedStatus, setChangedStatus] = useState('');

	const { editAwbNumber, loading:editLoading } = useEditAwbNumber({
		item,
		setShowEdit,
		setPage,
		setFinalList,
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
				if (shipments[GLOBAL_CONSTANTS.zeroth_index]?.id) {
					redirectToShipment(shipments[GLOBAL_CONSTANTS.zeroth_index].id);
				}
			};
			return (
				<div>
					<Button
						themeType="linkUi"
						onClick={handleClick}
					>
						{shipments[GLOBAL_CONSTANTS.zeroth_index]?.serial_id || '-'}
					</Button>
				</div>
			);
		},
		handleAction: (singleItem) => (
			<div className={styles.button_group}>
				<Button
					themeType="linkUi"
					onClick={() => {
						setItem(singleItem);
						setShowEdit(true);
						setChangedStatus('used');
					}}
				>
					<Tooltip content="Edit" placement="top">
						<IcMEdit height={16} width={16} fill="#8B8B8B" />
					</Tooltip>
				</Button>
				<Button
					themeType="linkUi"
					onClick={() => {
						setItem(singleItem);
						setShowConfirm(true);
						setChangedStatus('cancelled');
					}}
				>
					<Tooltip content="Cancel" placement="top">
						<IcMDelete height={16} width={16} fill="#8B8B8B" />
					</Tooltip>
				</Button>
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
			/>
			{showEdit && (
				<Modal
					show={showEdit}
					onClose={() => setShowEdit(false)}
					className={styles.modal_container}
				>
					<EditAwbNumber
						item={item}
						setShowEdit={setShowEdit}
						editAwbNumber={editAwbNumber}
						loading={editLoading}
					/>
				</Modal>
			)}
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
export default AwbNumberUsed;
