import { Button, Tooltip, Modal } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { functions } from '../../commons/Functions';
import List from '../../commons/List';
import { AwbNumberFields } from '../../configurations/awb-number-fields';
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
	const [item, setItem] = useState({ id: '' });
	const [showConfirm, setShowConfirm] = useState(false);
	const [changedStatus, setChangedStatus] = useState('');

	const { fields } = AwbNumberFields;

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

	const otherFunctions = {
		handleAction: (singleItem) => (
			<div className={styles.tooltip_container}>
				<Tooltip
					content="Recover AWB Number"
					placement="top"
					interactive
				>
					<Button
						themeType="linkUi"
						onClick={() => {
							setItem(singleItem);
							setShowConfirm(true);
							setChangedStatus('available_non_reserved');
						}}
					>
						<IcMProvision height={16} width={16} fill="#8B8B8B" />
					</Button>
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
