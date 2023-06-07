import SingleSelectedCard from './SingleSelectedCard';

function SelectedCards({ prefrences }) {
	return (
		<div>
			{prefrences?.map((Singleitem, index) => (
				<div key={Singleitem}>
					<SingleSelectedCard data={Singleitem?.data} index={index} />
				</div>
			))}
		</div>
	);
}

export default SelectedCards;
