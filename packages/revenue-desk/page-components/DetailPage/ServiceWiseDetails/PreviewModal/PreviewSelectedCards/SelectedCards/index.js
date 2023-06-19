import SingleSelectedCard from './SingleSelectedCard';

function SelectedCards({ prefrences, shipmentType }) {
	return (
		<div>
			{prefrences?.map((singleItem) => (
				<SingleSelectedCard
					data={singleItem?.data}
					priority={singleItem?.priority}
					shipmentType={shipmentType}
					key={singleItem?.rate_id}
				/>
			))}
		</div>
	);
}

export default SelectedCards;
