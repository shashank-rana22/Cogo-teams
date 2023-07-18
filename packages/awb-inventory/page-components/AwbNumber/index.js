import { Button, Modal, Pill } from '@cogoport/components';
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
}) {
	const [item, setItem] = useState({ id: '' });
	const [showEdit, setShowEdit] = useState(false);

	const { fields } = AwbNumberFields;

	const { editAwbNumber, loading:editLoading } = useEditAwbNumber({
		item,
		awbList,
		setShowEdit,
		setPage,
		setFinalList,
		setQfilter,
		page,
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
						}}
					>
						Reserve AWB
					</Button>
				)}
				{singleItem.status === 'available_reserved' && (
					<>
						<Pill size="sm" color="green">Reserved</Pill>
						<Button
							themeType="linkUi"
							onClick={() => {
								setItem(singleItem);
								setShowEdit(true);
							}}
						>
							<IcMEdit height={16} width={16} fill="#8B8B8B" />
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
