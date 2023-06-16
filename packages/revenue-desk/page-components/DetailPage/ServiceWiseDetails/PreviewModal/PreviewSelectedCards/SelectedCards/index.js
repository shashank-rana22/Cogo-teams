import SingleSelectedCard from './SingleSelectedCard';

function SelectedCards({ prefrences, price, shipmentType }) {
	return (
		<div>
			{prefrences?.map((Singleitem, index) => (
				<div key={Singleitem?.id}>
					<SingleSelectedCard
						data={Singleitem?.data}
						index={index}
						price={price}
						shipmentType={shipmentType}
					/>
				</div>
			))}
		</div>
	);
}

export default SelectedCards;
