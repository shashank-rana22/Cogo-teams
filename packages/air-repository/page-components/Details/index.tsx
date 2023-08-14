import { Badge, Button, Popover, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import List from '../../commons/List';
import { ListDataType } from '../../commons/List/Interfaces';
import { RepositoryFields } from '../../configurations/repository-fields';

import ConfirmDelete from './ConfirmDelete';
import POCDetails from './POCDetails';
import styles from './styles.module.css';

interface NestedObj {
	[key: string]: string;
}

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

interface EditDetailProps {
	singleItem: NestedObj;
}

function EditDetail({ singleItem = {} }:EditDetailProps) {
	const { last_edited_by:lastEditedBy, updated_at:updatedAt } = singleItem || {};
	return (
		<div className={styles.edit_detail}>
			Last Edited :
			<span>
				BY:
				{' '}
				{lastEditedBy}
				{' '}
				-
				{' '}
				{formatDate({
					date       : updatedAt,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'dateTime',
					separator  : ' ',
				})}
			</span>
		</div>
	);
}

const functions = (setShowModal, setItem, setEdit, listRepository) => ({
	handleAirline: (singleItem) => (
		singleItem?.airline?.business_name
	),
	handleAirport: (singleItem) => (
		singleItem?.airport?.display_name
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
	handleEditDetail: (singleItem) => (
		<div className={styles.tooltip_container}>
			<Tooltip
				content={<EditDetail singleItem={singleItem} />}
				placement="top"
				interactive
			>
				<div className={styles.overflow_text}><EditDetail singleItem={singleItem} /></div>
			</Tooltip>
		</div>
	),
});

function Details({
	data = {},
	loading = false,
	setShowModal = () => {},
	setItem = () => {},
	setEdit = () => {},
	listRepository = () => {},
	page = 1,
	setPage = () => {},
}:DetailsProps) {
	const { fields } = RepositoryFields;

	return (
		<div className={styles.details_list}>
			<List
				fields={fields}
				data={data}
				loading={loading}
				functions={functions(setShowModal, setItem, setEdit, listRepository)}
				page={page}
				setPage={setPage}
				Child={POCDetails}
			/>
		</div>
	);
}

export default Details;
