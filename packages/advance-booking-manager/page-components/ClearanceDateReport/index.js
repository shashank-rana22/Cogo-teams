import { Modal, Tooltip, ButtonIcon } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { functions } from '../../commons/Functions';
import List from '../../commons/List';
import { ClearanceDateReportFields } from '../../configurations/clearance-date-report-fields';
import useEditClearanceDateReport from '../../hooks/useEditClearanceDateReport';
import EditClearanceDateReport from '../EditClearanceDateReport';

import styles from './styles.module.css';

function ClearanceDateReport({
	loading = false,
	setPage = () => {},
	page = 1,
	data = {},
	clearanceDateReport = () => {},
	finalList = [],
	setFinalList = () => {},
	setQfilter = () => {},
}) {
	const [item, setItem] = useState({ id: '' });
	const [showEdit, setShowEdit] = useState(false);

	const { fields } = ClearanceDateReportFields;

	const { editClearanceDateReport, loading:editLoading } = useEditClearanceDateReport({
		item,
		clearanceDateReport,
		setShowEdit,
		setPage,
		setFinalList,
		page,
		setQfilter,
	});

	const otherFunctions = {
		handleAction: (singleItem) => (
			<div className={styles.button_group}>
				<Tooltip content="Edit" placement="top">
					<ButtonIcon
						themeType="primary"
						onClick={() => {
							setItem(singleItem);
							setShowEdit(true);
						}}
						icon={<IcMEdit height={16} width={16} fill="#8B8B8B" />}
					/>
				</Tooltip>
			</div>
		),
	};

	const allFunctions = { ...functions, ...otherFunctions };

	return (
		<div>
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
				>
					<EditClearanceDateReport
						item={item}
						setShowEdit={setShowEdit}
						editClearanceDateReport={editClearanceDateReport}
						loading={editLoading}
					/>
				</Modal>
			)}
		</div>
	);
}

export default ClearanceDateReport;
