import { Button, Modal, Pill, Tooltip } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { functions } from '../../commons/Functions';
import List from '../../commons/List';
import { AwbNumberFields } from '../../configurations/awb-number-fields';
import useEditAwbNumber from '../../hooks/useEditAwbNumber';
import EditAwbNumber from '../EditAwbNumber';

import styles from './styles.module.css';

function AwbNumber({
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
	const [item, setItem] = useState({ id: '' });
	const [showEdit, setShowEdit] = useState(false);
	const [changedStatus, setChangedStatus] = useState('');

	const { fields } = AwbNumberFields;

	const { editAwbNumber, loading:editLoading } = useEditAwbNumber({
		item,
		awbList,
		setShowEdit,
		setPage,
		setFinalList,
		setQfilter,
		page,
		changedStatus,
	});

	const otherFunctions = {
		handleAction: (singleItem) => (
			<div className={styles.button_group}>
				{singleItem.status === 'available_non_reserved' && (
					<Button
						themeType="primary"
						size="md"
						onClick={() => {
							setItem(singleItem);
							setShowEdit(true);
							setChangedStatus('available_reserved');
						}}
					>
						Reserve AWB
					</Button>
				)}
				{singleItem.status === 'available_reserved' && (
					<>
						<Tooltip
							content={(
								<div style={{ wordBreak: 'break-word', minWidth: '250px' }}>
									<div>
										Clearance Date:
										{' '}
										{singleItem.customClearanceDate || '-'}
										,
									</div>
									<div>
										Booking Date:
										{' '}
										{singleItem.bookingDate || '-'}
										,
									</div>
									<div>
										Commodity:
										{singleItem?.commodityDetails?.commodity || '-'}
										,
									</div>
									<div>
										Chargeable Weight:
										{singleItem.chargeableWeight || '-'}
									</div>
								</div>
							)}
							placement="top"
						>
							<Pill size="sm" color="var(--color-tertiary-success-green-2)">Reserved</Pill>
						</Tooltip>
						<Button
							themeType="linkUi"
							onClick={() => {
								setItem(singleItem);
								setShowEdit(true);
								setChangedStatus('available_reserved');
							}}
						>
							<Tooltip content="Edit" placement="top">
								<IcMEdit height={16} width={16} fill="#8B8B8B" />
							</Tooltip>
						</Button>
					</>
				)}
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
		</div>
	);
}
export default AwbNumber;
