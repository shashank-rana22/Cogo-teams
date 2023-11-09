import { cl } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import FunnelGraph from 'funnel-graph-js';
import React, { useRef, useEffect, useState } from 'react';

import getFormattedAmount from '../../utils/getFormattedAmount';

import styles from './styles.module.css';

function DataContainer({
	itm = '',
	data = {},
	index = 0,
	showSegregation = false,
	subLabels = [],
	hoverIndex = '',
}) {
	return (
		<>
			<div className={styles.upper_container}>
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

			{(showSegregation && !isEmpty(subLabels) && hoverIndex === index)
				? (
					<div className={styles.lower_container}>
						{subLabels.map((item, idx) => (
							<div
								key={itm}
								className={styles.sub_label}
							>
								{startCase(item)}
								:
								<span>
									{getFormattedAmount({ number: data?.values?.[index]?.[idx] })}
								</span>
							</div>
						))}
					</div>
				) : null}
		</>
	);
}

function FunnelGraphStruct({
	data = [],
	type = '',
	showSegregation = true,
	subLabels = [],
	showDataBelow = false,
}) {
	const [hoverIndex, setHoverIndex] = useState('');
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

		funnelRef.current?.draw?.();
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
									onMouseEnter={() => setHoverIndex(index)}
									onMouseLeave={() => setHoverIndex('')}
								>
									<DataContainer
										itm={itm}
										data={data}
										index={index}
										showSegregation={showSegregation}
										subLabels={subLabels}
										hoverIndex={hoverIndex}
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
