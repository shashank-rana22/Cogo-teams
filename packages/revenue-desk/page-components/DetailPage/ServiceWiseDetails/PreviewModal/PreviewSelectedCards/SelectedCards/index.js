import { INCREMENT_BY_ONE } from '../../../../../constants';

import SingleSelectedCard from './SingleSelectedCard';

function SelectedCards({ prefrences, shipmentType }) {
	return (
		<div>
			{prefrences?.map((singleItem, index) => (
				<SingleSelectedCard
					data={singleItem?.data}
					priority={index + INCREMENT_BY_ONE}
					shipmentType={shipmentType}
					key={singleItem?.rate_id}
					fromKey={singleItem?.key}
				/>
			))}
		</div>
	);
}

export default SelectedCards;
