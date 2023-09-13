import { Placeholder, Pagination, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { CARDS_MAPPING, HEADINGS } from '../../configurations/helpers/constants';
import Card from '../TasksOverview/OverviewContent/Card';

import ListCard from './ListCard';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

const DEFAULT_PAGE_VALUE = 1;
const LIST_CARD_LOADER_COUNT = 5;

function ListData({
	data = {},
	statsData = {},
	getListCoverage = () => {},
	filter = {},
	source = null,
	setSource = () => {},
	listLoading = false,
	page = 1,
	setPage = () => {},
	serialId = '',
	setSerialId = () => {},
	getStats = () => {},
}) {
	const { statistics = {} } = statsData;
	const { list = [] } = data;
	const { dynamic_statistics = {} } = statsData;

	useEffect(() => {
		getListCoverage(serialId);
	}, [getListCoverage, serialId]);

	const handleClick = (card) => {
		setSource(card);
		setPage(DEFAULT_PAGE_VALUE);
		setSerialId('');
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.details_container}>
				{Object.keys(CARDS_MAPPING).map((card) => (
					<Card
						key={card}
						detail={CARDS_MAPPING[card]}
						data={dynamic_statistics}
						activeCard={source}
						statsLoading={listLoading}
						filter={filter}
						handleClick={() => { handleClick(card); }}
						className={(card === source)
							? 'blue_color_container' : 'card_container'}
					/>
				))}
			</div>
			<div className={styles.container}>
				{source
				&& (
					<span>
						{dynamic_statistics[source] || DEFAULT_VALUE}
						{' '}
						{HEADINGS[source] || 'Critical Port Pairs'}
					</span>
				)}
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
				{listLoading && [...new Array(LIST_CARD_LOADER_COUNT).keys()].map((ind) => (
					<Placeholder
						height="15vh"
						key={ind}
						style={{ marginTop: '10px' }}
					/>
				))}
				{(!isEmpty(list) && !listLoading) && (
					<>
						{(list || []).map((list_data) => (
							<ListCard
								data={list_data}
								key={list_data?.id}
								getListCoverage={getListCoverage}
								filter={filter}
								getStats={getStats}
							/>
						))}
						<div className={styles.pagination}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={dynamic_statistics[source] || statistics[filter?.status]}
								pageSize={10}
								onPageChange={(pageNumber) => { setPage(pageNumber); }}
							/>
						</div>
					</>
				)}
				{(isEmpty(list) && !listLoading)
				&& (
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
