import { Badge, Button, Popover, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import List from '../../commons/List';
import { ListDataType } from '../../commons/List/Interfaces';
import { RepositoryFields } from '../../configurations/repository-fields';

import ConfirmDelete from './ConfirmDelete';
import styles from './styles.module.css';

interface DetailsProps {
	data: ListDataType;
	loading: boolean;
	setShowModal: React.FC;
	setItem: React.FC;
	setEdit: React.FC;
	listRepository: React.FC;
	page: number;
	setPage: React.FC;
}

function Details({
	data, loading, setShowModal, setItem, setEdit, listRepository, page, setPage,
}:DetailsProps) {
	const { fields } = RepositoryFields;

	const functions = {
		handleAirline: (singleItem) => (
			singleItem?.airline?.business_name
		),
		handleMode: (singleItem) => (
			<Badge
				size="md"
				color="#CFEAED"
				text={startCase(singleItem?.booking_mode)}
				className={styles.mode_badge}
			/>
		),
		handlePlatformURL: (singleItem) => (
			singleItem?.lms_url ? (
				<Button
					size="md"
					themeType="linkUi"
					onClick={() => window.open(singleItem?.lms_url, '_blank')}
					style={{ color: '#F68B21', padding: 0 }}
					className={styles.url_button}
				>
					<div className={styles.overflow_text}>{singleItem?.lms_url}</div>
				</Button>
			) : '-'),
		handleAction: (singleItem) => (
			<div className={styles.action_buttons}>
				<Button
					size="md"
					themeType="linkUi"
					onClick={() => { setItem(singleItem); setShowModal(true); setEdit(true); }}
					style={{ color: '#F68B21' }}
				>
					<IcMEdit height={16} width={16} />
				</Button>
				<Popover placement="top" render={<ConfirmDelete item={singleItem} listRepository={listRepository} />}>
					<Button
						size="md"
						themeType="linkUi"
						style={{ color: '#F68B21' }}
					>
						<IcMDelete height={16} width={16} />
					</Button>
				</Popover>
			</div>
		),
		handleEditDetail: (singleItem) => {
			const editDetail = (
				<div className={styles.edit_detail}>
					Last Edited :
					<span>
						BY:
						{' '}
						{singleItem.last_edited_by}
						{' '}
						-
						{' '}
						{formatDate({
							date       : singleItem.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yy hh:mm'],
							formatType : 'date',
						})}
					</span>
				</div>
			);
			return (
				<div className={styles.tooltip_container}>
					<Tooltip
						content={editDetail}
						placement="top"
						interactive
					>
						<div className={styles.overflow_text}>{editDetail}</div>
					</Tooltip>
				</div>
			);
		},
	};
	return (
		<div className={styles.details_list}>
			<List
				fields={fields}
				data={data}
				loading={loading}
				functions={functions}
				page={page}
				setPage={setPage}
			/>
		</div>
	);
}

export default Details;
