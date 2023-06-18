import SingleSelectedCard from './SingleSelectedCard';

function SelectedCards({ prefrences, shipmentType }) {
	return (
		<div>
			{prefrences?.map((Singleitem, index) => (
				<div key={Singleitem?.id}>
					<SingleSelectedCard
						data={Singleitem?.data}
						index={index}
						shipmentType={shipmentType}
					/>
				</div>
			))}
		</div>
	);
}

export default SelectedCards;
