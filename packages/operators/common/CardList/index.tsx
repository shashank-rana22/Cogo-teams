import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import CONSTANTS from '../../constants/constants';

import Header from './CardHeader';
import CardItem from './CardItem';
import EmptyState from './EmptyState';
import { FunctionObjects, FieldType, DataType, GenericObject } from './Interfaces';
import styles from './styles.module.css';

interface Props {
	fields: FieldType[];
	data: DataType;
	loading?: boolean;
	page?: number;
	setPage?: React.FC;
	finalList?: Array<object>;
	setFinalList?: React.FC;
	functions?: FunctionObjects;
}

const TIMEOUT_TIME = 1000;
const SCROLLING_LIMIT = 10;

function CardList({
	fields = [],
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	finalList = [],
	setFinalList = () => {},
	functions = {},
} :Props) {
	const { list = [], total_count:totalCount } = data;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setPage((p) => p + CONSTANTS.START_PAGE);
			}
		}, TIMEOUT_TIME);
	}, [loading, setPage]);

	const handleRender = () => (finalList || []).map((singleitem:GenericObject) => (
		<CardItem
			key={singleitem.id}
			singleitem={singleitem}
			fields={fields}
			functions={functions}
		/>
	));

	useEffect(() => {
		if (!isEmpty(list)) {
			if (page === 1) {
				setFinalList([...list]);
			} else {
				setFinalList(finalList.concat(list));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

	return (
		<section>
			<Header fields={fields} />
			<div className={styles.scroll}>
				<InfiniteScroll
					pageStart={1}
					initialLoad={false}
					loadMore={loadMore}
					hasMore={page < Math.ceil(totalCount / SCROLLING_LIMIT)}
					loader={!loading ? (
						<div className={styles.loading_style}>
							<Loader />
						</div>
					) : null}
					useWindow={false}
					threshold={600}
				>
					<div>{handleRender()}</div>
				</InfiniteScroll>
				{isEmpty(finalList) && !loading ? <EmptyState /> : null}
				{loading && (
					<div className={styles.loading_style}>
						<Loader />
					</div>
				)}
				{finalList.length === totalCount && !isEmpty(finalList) ? (
					<div className={styles.end_message}>No more data to show</div>
				) : null}
			</div>
		</section>
	);
}

export default CardList;
