import { cl } from '@cogoport/components';
import FunnelGraph from 'funnel-graph-js';
import React, { useRef, useEffect } from 'react';

import getFormattedAmount from '../../utils/getFormattedAmount';

import styles from './styles.module.css';

function DataContainer({
	itm = '',
	data = {},
	index = 0,
}) {
	return (
		<>
			<div>{itm}</div>
			<div className={styles.graph_values}>
				{getFormattedAmount({
					number: data.values[index].reduce(
						(acc, item) => acc + item,
						0,
					),
				})}
			</div>
		</>
	);
}

function FunnelGraphStruct({
	data = [],
	type = '',
	showSegregation = true,
	showDataBelow = false,
}) {
	const funnelContainer = useRef();

	const funnelRef = useRef();

	useEffect(() => {
		funnelRef.current = new FunnelGraph({
			container         : `.funnel_graph_${type}`,
			direction         : 'horizontal',
			gradientDirection : 'horizontal',
			displayPercent    : false,
			data,
			width             : funnelContainer.current.clientWidth,
			height            : 200,
		});

		funnelRef.current.draw();
	}, [data, type]);

	return (
		<div
			className={cl`${styles.graph_container} 
				${showSegregation ? styles.segregation_container : ''}`}
			ref={funnelContainer}
		>
			<div className={`funnel_graph_${type}`} />
			{(showSegregation || showDataBelow)
				? (
					<div
						className={showSegregation
							? styles.graph_labels : styles.graph_data}
					>
						{data.labels.map(
							(itm, index) => (
								<div
									key={itm}
									className={showSegregation
										? styles.graph_labels_item
										: styles.graph_data_item}
								>
									<DataContainer
										itm={itm}
										data={data}
										index={index}
									/>
								</div>
							),
						)}
					</div>
				) : null}
		</div>
	);
}

export default FunnelGraphStruct;
