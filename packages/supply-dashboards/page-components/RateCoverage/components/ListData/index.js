import { Placeholder, Pagination, Input, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { CARDS_MAPPING, HEADINGS } from '../../configurations/helpers/constants';
import Filter from '../Filter';
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
	setFilter = () => {},
	source = null,
	setSource = () => {},
	listLoading = false,
	page = 1,
	setPage = () => {},
	getStats = () => {},
	setShowWeekData = () => {},
}) {
	const [serialId, setSerialId] = useState('');
	const [showFilters, setShowFilters] = useState(false);
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
				<div style={{ display: 'flex' }}>
					{source
				&& (
					<span style={{ marginTop: '4px' }}>
						{dynamic_statistics[source] || DEFAULT_VALUE}
						{' '}
						{HEADINGS[source] || 'Critical Port Pairs'}
					</span>
				)}
					<Input
						size="sm"
						value={serialId}
						onChange={(val) => setSerialId(val)}
						placeholder="Search by TID"
						style={{ width: '200px', marginLeft: '10px' }}
					/>
				</div>

				<div>
					<Button
						themeType="secondary"
						onClick={() => { setShowFilters((prev) => !prev); }}
						style={{ width: '100px' }}
					>
						<IcMFilter style={{ marginRight: '6px', width: 'auto', height: '16px' }} />
						<span className={styles.filter_text}> Filter </span>
					</Button>
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
				<div>
					{(!isEmpty(list) && !listLoading) && (
						<>
							{(list || []).map((list_data) => (
								<div key={list_data?.id}>
									<ListCard
										data={list_data}
										key={list_data?.id}
										getListCoverage={getListCoverage}
										filter={filter}
										getStats={getStats}
										source={source}
									/>
								</div>
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

			{showFilters
			&& (
				<Filter
					source={source}
					filter={filter}
					showFilters={showFilters}
					setShowFilters={setShowFilters}
					setFilter={setFilter}
					setSerialId={setSerialId}
					setShowWeekData={setShowWeekData}
				/>
			)}
		</div>
	);
}

export default ListData;
