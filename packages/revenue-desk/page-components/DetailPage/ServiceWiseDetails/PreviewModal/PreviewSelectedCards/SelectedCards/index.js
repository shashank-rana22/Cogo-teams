import SingleSelectedCard from './SingleSelectedCard';

function SelectedCards({ prefrences, shipmentType }) {
	console.log(prefrences, 'prefrences');
	return (
		<div>
			{prefrences?.map((singleItem, index) => (
				<SingleSelectedCard
					data={singleItem?.data}
					priority={index + 1}
					shipmentType={shipmentType}
					key={singleItem?.rate_id}
					fromKey={singleItem?.key}
				/>
			))}
		</div>
	);
}

export default SelectedCards;
