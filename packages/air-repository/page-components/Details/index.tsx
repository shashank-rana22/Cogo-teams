import { Badge, Button, Popover } from '@cogoport/components';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
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
			<div className={styles.airline}>{singleItem?.airline?.business_name}</div>
		),
		handleMode: (singleItem) => (
			<Badge
				size="md"
				color="#CFEAED"
				text={startCase(singleItem.mode)}
				className={styles.mode_badge}
			/>
		),
		handlePlatformURL: (singleItem) => (
			singleItem?.platform_url ? (
				<Button
					size="md"
					themeType="linkUi"
					onClick={() => window.open(singleItem?.platform_url, '_blank')}
					style={{ color: '#F68B21', padding: 0 }}
				>
					{singleItem?.platform_url}
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
			<div className={styles.edit_detail}>
				Last Edited :
				<span>
					BY:
					{' '}
					{singleItem.last_edited_by}
					{' '}
					-
					{' '}
					{format(singleItem.updated_at, 'dd/MM/yy hh:mm', {}, false)}
				</span>
			</div>
		),
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
