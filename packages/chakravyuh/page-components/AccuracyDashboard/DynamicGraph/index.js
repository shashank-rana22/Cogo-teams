import { Placeholder } from '@cogoport/components';
import React, { useState } from 'react';

import useGetFclFreightRateLifecycle from '../../../hooks/useGetFclFreightRateLifecycle';

import GraphLayout from './GraphLayout';
import styles from './styles.module.css';

const PLACEHOLDER_LENGTH = 3;
function DynamicGraph({ globalFilters = {} }) {
	const [activeParent, setActiveParent] = useState(null);
	const { loading, graphs } = useGetFclFreightRateLifecycle({ globalFilters });

	const graphsList = Object.entries(graphs || {}).map(([title, value]) => ({
		title,
		graph: value,
	})) || [];

	return (
		<>
			{graphsList.map(({ title = 'rate_lifecycle', graph }) => (
				<GraphLayout
					key={graph}
					graph={graph}
					title={title}
					activeParent={activeParent}
					setActiveParent={setActiveParent}
				/>
			))}
			{loading
				? [...Array(PLACEHOLDER_LENGTH).keys()].map((key) => (
					<Placeholder
						key={key}
						className={styles.graph_placeholder}
						width="100%"
						height="400px"
						margin="24px 0"
					/>
				))
				: null}
		</>
	);
}

export default DynamicGraph;
