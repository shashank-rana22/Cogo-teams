import EmptyState from '../../../common/EmptyState/EmptyState';
import Card from '../Card';

function ForecastList({ dataList = [] }) {
	if (dataList) {
		return (
			<div>
				<EmptyState
					height="250"
					width="400"
					flexDirection="column"
					alignItems="center"
					emptyText="Data Not Found"
					textSize="20"
					marginTop="100px"
				/>
			</div>
		);
	}
	return (
		dataList.map((card) => (
			<Card key={card?.id} />
		))
	);
}

export default ForecastList;
