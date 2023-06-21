import { Modal } from '@cogoport/components';
import { useState } from 'react';

import useGetContractPreviousServiceProviders from '../../../hooks/useGetContractPreviousServiceProviders';

import Card from './Card';
import styles from './styles.module.css';

function RevenueList({ itemData:currentShipmentData }) {
	const { data, loading } = useGetContractPreviousServiceProviders({
		currentShipmentData,
	});
	const [show, setshow] = useState(false);
	const ZERO = 0;
	const THREE = 3;
	const newData = Array.isArray(data) ? (data || []).slice(ZERO, THREE) : null;
	return (
		<div className={styles.outermost}>
			{newData && (
				<div className={styles.view_button}>
					<div
						role="presentation"
						className={styles.viewText}
						onClick={() => { setshow(true); }}
					>
						View More

					</div>

				</div>
			)}
			<div className={styles.outerContainer}>
				{(!loading && newData) && (newData || []).map((singleItem) => (
					<div className={styles.container} key={singleItem}>
						<Card item={singleItem} />
					</div>
				))}
				{!loading && !newData && 'No previous shipments found!'}
			</div>
			{show && newData && (
				<Modal
					size="lg"
					style={{ maxHeight: '75vh' }}
					show={show}
					onClose={() => setshow(false)}
					placement="top"
				>
					<div className={styles.modal_outerContainer}>
						{(data || []).map((singleItem) => (
							<div className={styles.modal_container} key={singleItem}>
								<Card item={singleItem} />
							</div>
						))}
					</div>
				</Modal>
			)}
		</div>
	);
}
export default RevenueList;
