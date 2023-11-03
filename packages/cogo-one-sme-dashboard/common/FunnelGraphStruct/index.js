import FunnelGraph from 'funnel-graph-js';
import React, { useRef, useEffect } from 'react';

import getFormattedAmount from '../../utils/getFormattedAmount';

import styles from './styles.module.css';

function FunnelGraphStruct({ data = [], type = '' }) {
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
			className={styles.graph_container}
			ref={funnelContainer}
		>
			<div className={`funnel_graph_${type}`} />
			<div className={styles.graph_labels}>
				{data.labels.map(
					(itm, index) => (
						<div
							key={itm}
							className={styles.graph_labels_item}
						>
							<div>{itm}</div>
							<div className={styles.graph_values}>
								{getFormattedAmount({
									number: data.values[index].reduce(
										(acc, item) => acc + item,
										0,
									),
								})}
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default FunnelGraphStruct;
