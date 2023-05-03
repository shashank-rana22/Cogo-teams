import { Badge, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import List from '../../commons/List';
import { RepositoryFields } from '../../configurations/repository-fields';

import styles from './styles.module.css';

function Details({ data, loading }) {
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
