import { Button } from '@cogoport/components';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { functions } from '../../commons/Functions';
import List from '../../commons/List';
// import { AwbNumberFields } from '../../configurations/awb-number-fields';
import { ClearanceDateReportFields } from '../../configurations/clearance-date-report-fields';
// import useEditAwbNumber from '../../hooks/useEditAwbNumber';
// import ConfirmDelete from '../ConfirmDelete';
// import EditAwbNumber from '../EditAwbNumber';

import styles from './styles.module.css';

function ClearanceDateReportList({
	loading,
	setPage,
	page,
	data,
	// clearanceDateReport,
	finalList,
	setFinalList,
	// filters,
	// setFilters,
	// qfilter,
	// setQfilter,
}) {
	// const [item, setItem] = useState({ id: '' });
	// const [showEdit, setShowEdit] = useState(false);
	// const [showConfirm, setShowConfirm] = useState(false);

	const { fields } = ClearanceDateReportFields;

	const otherFunctions = {
		// define singleItem here
		handleAction: () => (
			<div className={styles.button_group}>
				<Button
					themeType="linkUi"
					// onClick={() => {
					// 	setItem(singleItem);
					// 	// setShowEdit(true);
					// }}
				>
					<IcMEdit height={16} width={16} fill="#8B8B8B" />
				</Button>
				<Button
					themeType="linkUi"
					// onClick={() => {
					// 	setItem(singleItem);
					// 	// setShowConfirm(true);
					// }}
				>
					<IcMDelete height={16} width={16} fill="#8B8B8B" />
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
			{/* {showEdit && (
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
			)} */}
			{/* {showConfirm && (
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
			)} */}
		</div>
	);
}

export default ClearanceDateReportList;
