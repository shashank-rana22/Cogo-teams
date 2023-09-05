/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Placeholder, Pagination, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { CARDS_MAPPING, HEADINGS } from '../../helpers/constants';
import Card from '../TasksOverview/OverviewContent/Card';

import ListCard from './ListCard';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

const DEFAULT_PAGE_VALUE = 1;

function ListData({
	data = {},
	list = [],
	getListCoverage = () => {},
	filter = {},
	source = 'critical_ports',
	setSource = () => {},
	listLoading = false,
	page = 1,
	setPage = () => {},
	serialId = '',
	setSerialId = () => {},
}) {
	useEffect(() => {
		getListCoverage(serialId);
	}, [getListCoverage, serialId]);

	return (
		<div className={styles.main_container}>
			<div className={styles.details_container}>
				{Object.keys(CARDS_MAPPING).map((card) => (
					<div
						key={card}
						className={(card === source)
							? styles.blue_color_container : styles.card_container}
						onClick={() => {
							setSource(card);
							setPage(DEFAULT_PAGE_VALUE);
							setSerialId('');
						}}
						role="button"
					>
						<Card
							detail={CARDS_MAPPING[card]}
							data={data}
							activeCard={source}
							statsLoading={listLoading}
							filter={filter}
						/>
					</div>
				))}
			</div>
			<div className={styles.container}>
				<span>
					{data[source] || DEFAULT_VALUE}
					{' '}
					{HEADINGS[source] || 'Critical Port Pairs'}
				</span>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Input
						size="sm"
						value={serialId}
						onChange={(val) => setSerialId(val)}
						placeholder="Search by TID"
					/>
				</div>
			</div>
			<div>
				{listLoading && ['1', '2', '3', '4', '5'].map((ind) => (
					<Placeholder
						height="15vh"
						key={ind}
						style={{ marginTop: '10px' }}
					/>
				))}
				{ (!isEmpty(list)) ? (
					<>
						{(list || []).map((list_data) => (
							<ListCard
								data={list_data}
								key={list_data?.id}
								getListCoverage={getListCoverage}
								filter={filter}
							/>
						))}
						<div className={styles.pagination}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={data[source]}
								pageSize={10}
								onPageChange={(pageNumber) => { setPage(pageNumber); }}
							/>
						</div>
					</>
				) : (
					<EmptyState
						height={220}
						width={380}
						flexDirection="column"
						textSize="20px"
					/>
				)}
			</div>
		</div>
	);
}

export default ListData;
