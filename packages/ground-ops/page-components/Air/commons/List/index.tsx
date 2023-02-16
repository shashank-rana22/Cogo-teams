import { Loader, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import EmptyState from './EmptyState';
import GetLocation from './getLocation';
import { FunctionObjects, FieldType, DataType } from './Interfaces';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

interface Props {
	fields: FieldType[];
	data: DataType;
	loading?: boolean;
	page?: number;
	setPage?: any;
	finalList?: any;
	setFinalList?: any;
	functions?: FunctionObjects;
}

function List({
	fields = [],
	data = {},
	loading = false,
	page,
	setPage,
	finalList = [],
	setFinalList,
	functions,
} :Props) {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { list = {}, total_count = 0 } = data;
	const { shipmentPendingTasks = [], airportIds = [] } = list;

	const { data: airportData = {}, listAirport } = GetLocation({ airportIds });

	const { list: airportList = [] } = airportData;

	const finalData = [];
	(airportList || []).forEach((item) => {
		(shipmentPendingTasks || []).map((itm) => {
			if (item.id === itm.originAirportId) {
				const pushData = {
					...itm,
					origin: item.name,
				};
				finalData.push(pushData);
			}
			return finalData;
		});
	});

	// (airportList || []).forEach((item) => {
	// 	(shipmentPendingTasks || []).map((itm) => {
	// 		if (item.id === itm.destinationAirportId) {
	// 			const pushData = {
	// 				...itm,
	// 				destination: item.name,
	// 			};
	// 			finalData.push(pushData);
	// 		}
	// 		return finalData;
	// 	});
	// });

	console.log('final', finalData);

	const handleRender = () => (finalData || [1, 2, 3, 4, 5]).map((singleitem) => (
		<ListItem
			singleitem={singleitem}
			fields={fields}
			functions={functions}
			loading={loading}
		/>
	));

	useEffect(() => {
		if (!loading) {
			listAirport();
		}
	}, [data]);

	return (
		<section>
			<ListHeader fields={fields} />
			<div className={styles.scroll}>
				<div className="card-list-data">{handleRender()}</div>
				{finalData.length > 0 ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={total_count}
							pageSize={10}
							type="table"
						/>
					</div>
				) : null}
			</div>
		</section>
	);
}

export default List;
