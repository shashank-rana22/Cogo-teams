import SingleSelectedCard from './SingleSelectedCard';

function SelectedCards({ prefrences, shipmentType }) {
	return (
		<div>
			{prefrences?.map((singleItem, index) => (
				<SingleSelectedCard
					data={singleItem?.data}
					priority={index + 1}
					shipmentType={shipmentType}
					key={singleItem?.rate_id}
				/>
			))}
		</div>
	);
}

export default SelectedCards;
