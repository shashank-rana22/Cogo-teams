import { Badge, Button } from '@cogoport/components';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React, { useState } from 'react';

import List from '../../commons/List';
import { RepositoryFields } from '../../configurations/repository-fields';

import styles from './styles.module.css';

function Details({ data, loading, setShowModal, setItem, setEdit }) {
	const { fields } = RepositoryFields;

	const functions = {
		handleAirline: (singleItem) => (
			<div>{singleItem?.airline?.business_name}</div>
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
			<Button
				size="md"
				themeType="linkUi"
				onClick={() => window.open(singleItem?.platform_url, '_blank')}
				style={{ color: '#F68B21' }}
			>
				{singleItem?.platform_url}
			</Button>
		),
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
				<Button
					size="md"
					themeType="linkUi"
					onClick={() => window.open(singleItem?.platform_url, '_blank')}
					style={{ color: '#F68B21' }}
				>
					<IcMDelete height={16} width={16} />
				</Button>
			</div>
		),
		handleEditDetail: (singleItem) => (
			<div className={styles.edit_detail}>
				Last Edited :
				<span>
					BY: Rakesh -
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
			/>
		</div>
	);
}

export default Details;
