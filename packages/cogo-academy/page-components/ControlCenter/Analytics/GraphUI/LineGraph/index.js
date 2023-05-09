import { Carousel } from '@cogoport/components';

import styles from './styles.module.css';
import TokenAnalysisGraph from './TokenAnalysisGraph';
import TotalSearchesGraph from './TotalSearchesGraph';

function LineGraph({ graphData, tokenData }) {
	const CarouselData = [{
		key    : 'total_searches_graph',
		render : () => (
			<TotalSearchesGraph
				graphData={graphData}
			/>
		),
	},
	{
		key    : 'token_analysis_graph',
		render : () => (
			<TokenAnalysisGraph
				graphData={tokenData}
			/>
		),
	},
	];
	return (
		<div className={styles.carousel_data_container}>
			<Carousel size="md" slides={CarouselData} showArrow={false} />
		</div>

	);
}

export default LineGraph;
