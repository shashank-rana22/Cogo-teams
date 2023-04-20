// import Skeleton from '@cogoport/front/components/admin/Skeleton';
import React, { useEffect } from 'react';

// import useGetSuppier from '../../../../../../commons/Layout/SupplierSelect/useGetSupplier';

import Card from './Card';
import SelectNormal from './SelectNormal';
import styles from './styles.module.css';

function SelectRate({
	setStep,
	setSelectedCard,
	updateConfirmation,
	task,
	source = '',
}) {
	// const { data, loading } = useGetSuppier({
	// 	service_id   : task.service_id,
	// 	service_type : task.service_type,
	// });

	const list = [
		1,
		2,
		3,
	];
	// const list = data?.list || [];

	// const selected_priority = (list || []).find(
	// 	(item) => item.priority === item.selected_priority,
	// );

	// useEffect(() => {
	// 	if (selected_priority) {
	// 		setSelectedCard(selected_priority);
	// 		setStep(2);
	// 	}
	// }, [selected_priority]);

	return (
		<div className={styles.container}>
			<div className={styles.selection_div}>
				{/* {loading ? (
					<div className={styles.skeleton_wrap}>
						{Array(6)
							.fill(0)
							.map(() => (
								<Skeleton
									width="100%"
									height="20px"
									style={{ marginBottom: '10px' }}
								/>
							))}
					</div>
				) : null} */}
				{(list || []).map((item) => (
					<Card
						item={item}
						priority={item.priority}
						setStep={setStep}
						setSelectedCard={setSelectedCard}
						updateConfirmation={updateConfirmation}
					/>
				))}
				<SelectNormal
					setStep={setStep}
				/>
			</div>
		</div>
	);
}

export default SelectRate;
