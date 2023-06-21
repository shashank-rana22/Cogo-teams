import useGetContractPreviousServiceProviders from '../../../hooks/useGetContractPreviousServiceProviders';

import Card from './Card';
import styles from './styles.module.css';

function RevenueList({ itemData:currentShipmentData }) {
	const { data, loading } = useGetContractPreviousServiceProviders({
		currentShipmentData,
	});
	return (
		<div>
			{(data || []).map((singleItem) => (
				<div key={singleItem}>
					<Card item={singleItem} />
				</div>
			))}
		</div>
	);
}
export default RevenueList;
