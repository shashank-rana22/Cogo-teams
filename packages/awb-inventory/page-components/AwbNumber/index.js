import { Button, Tooltip, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAirport, IcMEdit, IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { AwbNumberFields } from '../../configurations/awb-number-fields';
import useEditAwbNumber from '../../hooks/useEditAwbNumber';
import ConfirmDelete from '../ConfirmDelete';
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
	const [showConfirm, setShowConfirm] = useState(false);

	const { fields } = AwbNumberFields;

	const { editAwbNumber, loading:editLoading } = useEditAwbNumber({
		item,
		awbList,
		setShowEdit,
		setPage,
		setFinalList,
		setQfilter,
		setShowConfirm,
		page,
	});

	const functions = {
		handleAirline: (singleItem) => (
			<div className={styles.tooltip_container}>
				<Tooltip
					content={singleItem?.airline?.business_name}
					placement="top"
					interactive
				>
					<div className={styles.airline_name}>
						{singleItem?.airline?.logo_url ? (
							<img
								src={singleItem?.airline?.logo_url}
								alt="Airline Logo"
								style={{ maxWidth: '20px', marginRight: '8px' }}
							/>
						) : (
							<IcMAirport
								width={18}
								height={16}
								fill="#888888"
								style={{ marginRight: '8px' }}
							/>
						)}
						{singleItem?.airline?.business_name}
					</div>
				</Tooltip>
			</div>
		),
		handleAirport: (singleItem) => (
			`(${singleItem?.airport?.port_code}) ${singleItem?.airport?.name}`
		),
		handleDestLocation: (singleItem) => (
			singleItem?.destination_location?.name
			&& singleItem?.destination_location?.name
		),
		handleIE: (singleItem) => (
			singleItem?.importer_exporter?.business_name
				&& singleItem?.importer_exporter?.business_name
		),
		handleAgent: (singleItem) => (
			singleItem?.procured_by?.name
		),
		handleServiceProvider: (singleItem) => (
			singleItem?.service_provider?.business_name
		),
		handleDate: (singleItem) => (
			<div className={styles.overflow_text}>
				{formatDate({
					date       : singleItem.procured_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
		handleAction: (singleItem) => (
			<div className={styles.button_group}>
				<Button
					themeType="linkUi"
					onClick={() => {
						setItem(singleItem);
						setShowEdit(true);
					}}
				>
					<IcMEdit height={16} width={16} fill="#8B8B8B" />
				</Button>
				<Button
					themeType="linkUi"
					onClick={() => {
						setItem(singleItem);
						setShowConfirm(true);
					}}
				>
					<IcMDelete height={16} width={16} fill="#8B8B8B" />
				</Button>
			</div>
		),
	};

	return (
		<div className={styles.awbnumber_container}>
			<List
				fields={fields}
				data={data}
				loading={loading}
				functions={functions}
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
export default AwbNumber;
