/* eslint-disable custom-eslint/check-element-role-button */
import { Placeholder, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../common/EmptyState';
import { CARDS_MAPPING, HEADINGS } from '../../helpers/constants';
import Card from '../TasksOverview/OverviewContent/Card';

import ListCard from './ListCard';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

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
}) {
	const handlePageChange = (pageNumber) => {
		setPage(pageNumber);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.details_container}>
				{Object.keys(CARDS_MAPPING).map((card) => (
					<div
						className={(card === source)
							? styles.blue_color_container : styles.card_container}
						key={card}
						tabIndex="0"
						role="button"
						onClick={() => { setSource(card); }}
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
			<div className={styles.pagination_container}>
				{data[source] || DEFAULT_VALUE}
				{' '}
				{HEADINGS[source] || 'Critical Port Pairs'}
				{!isEmpty(list)
					&& (
						<Pagination
							type="table"
							currentPage={page}
							totalItems={data[source]}
							pageSize={10}
							onPageChange={handlePageChange}
						/>
					)}
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
					</>
				)
					: (
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
