import { Placeholder, Pagination, Input, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import {
	CARDS_MAPPING, DEFAULT_VALUE, HEADINGS,
	LIST_CARD_LOADER_COUNT, VALUE_ONE,
} from '../../configurations/helpers/constants';
import Filter from '../Filter';
import Card from '../TasksOverview/OverviewContent/Card';

import FilterTags from './filterTags';
import ListCard from './ListCard';
import styles from './styles.module.css';

const SID_FILTER_TABS = ['live_booking', 'rate_request', 'rate_feedback'];

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
	userService = undefined,
}) {
	const [serialId, setSerialId] = useState('');
	const [shipmentId, setShipmentId] = useState('');
	const [showFilters, setShowFilters] = useState(false);

	const { query:sourceSerialIdq, debounceQuery:setSourceSerialIdq } = useDebounceQuery();
	const { query:serialIdq, debounceQuery:setSerialIdq } = useDebounceQuery();

	const { statistics = {} } = statsData;
	const { list = [] } = data;

	const { dynamic_statistics = {} } = statsData;

	const handleClick = (card) => {
		setSource(card);
		setPage(VALUE_ONE);
		setSerialId('');
	};

	useEffect(() => {
		getListCoverage(serialIdq, sourceSerialIdq);
	}, [getListCoverage, serialIdq, sourceSerialIdq, source]);

	useEffect(() => {
		setSourceSerialIdq(shipmentId);
	}, [setSourceSerialIdq, shipmentId]);

	useEffect(() => {
		setSerialIdq(serialId);
	}, [setSerialIdq, serialId]);

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
					{SID_FILTER_TABS.includes(source)
						&& (
							<Input
								size="sm"
								value={shipmentId}
								onChange={(val) => setShipmentId(val)}
								placeholder="Search by SID"
								style={{ width: '200px', marginLeft: '10px' }}
							/>
						)}
					<Input
						size="sm"
						value={serialId}
						onChange={(val) => setSerialId(val)}
						placeholder="Search by TID"
						style={{ width: '200px', marginLeft: '10px' }}
					/>
				</div>
				<div style={{ display: 'flex' }}>
					<div className={styles.tags}>
						<FilterTags filter={filter} setFilter={setFilter} source={source} setSource={setSource} />
					</div>
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
					setShowWeekData={setShowWeekData}
					userService={userService}
				/>
			)}
		</div>
	);
}

export default ListData;
