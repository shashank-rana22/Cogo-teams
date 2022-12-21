import Card from '../../../../commons/revenueDeskCommons/Card';

// import styles from './styles.module.css';

function CompletedJobs({
	data = [],
	total = '',
	hookSetters = () => {},
	page = 1,
	filters = {},
	activeTab = '',
	setClickedCard = () => {},
	clickedCard,
	shipment_type,
}) {
	const handleCardClick = (data_item) => {
		setClickedCard(data_item);
	};

	return (
		<div >
			{/* {handlepagination()} */}
			<div >
				{(data || []).map((item) => (
					<Card
						data={item}
						handleCardClick={handleCardClick}
						activeTab={activeTab}
						clickedCard={clickedCard}
						shipment_type={shipment_type}
					/>
				))}
			</div>

			{/* {handlepagination()} */}
		</div>
	);
}
export default CompletedJobs;