import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import CONSTANTS from '../../constants/constants';

import Header from './CardHeader';
import CardItem from './CardItem';
import EmptyState from './EmptyState';
import styles from './styles.module.css';

const INITIAL_PAGE = 1;
const TIMEOUT_TIME = 1000;
const SCROLLING_LIMIT = 10;
const INFINITE_SCROLL_THRESHOLD = 600;

function CardList({
	fields = [],
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	finalList = [],
	setFinalList = () => {},
	functions = {},
}) {
	const { t } = useTranslation(['operators']);

	const { list = [], total_count:totalCount } = data || {};

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setPage((p) => p + CONSTANTS.START_PAGE);
			}
		}, TIMEOUT_TIME);
	}, [loading, setPage]);

	useEffect(() => {
		if (!isEmpty(list)) {
			setFinalList(page === INITIAL_PAGE ? [...list] : finalList.concat(list));
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
					threshold={INFINITE_SCROLL_THRESHOLD}
				>
					<div>
						{(finalList || []).map((singleitem) => (
							<CardItem
								key={singleitem?.id}
								singleitem={singleitem}
								fields={fields}
								functions={functions}
							/>
						))}
					</div>
				</InfiniteScroll>
				{isEmpty(finalList) && !loading ? <EmptyState /> : null}
				{loading && (
					<div className={styles.loading_style}>
						<Loader />
					</div>
				)}
				{finalList.length === totalCount && !isEmpty(finalList) ? (
					<div className={styles.end_message}>{t('operators:card_list_no_data')}</div>
				) : null}
			</div>
		</section>
	);
}

export default CardList;
