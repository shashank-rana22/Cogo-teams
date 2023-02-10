import { Button } from '@cogoport/components';
import { useState } from 'react';

import Line from '../../../../common/Line';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';
import SureModal from '../../../../common/SureModal';
import formatPortPair from '../../../../utils/formatPortPair';

import styles from './styles.module.css';

function Content({
	handleUpdateContract,
	statsData,
	data,
	loadingUpdate,
}) {
	const [showModal, setShowModal] = useState(null);

	const formattedData = formatPortPair({ item: data });

	let counter = 0;
	formattedData.forEach((item) => {
		if (item?.status === 'quoted' || item?.status === 'pending') {
			counter += 1;
		}
	});
	const handleCloseModal = () => {
		setShowModal(null);
	};
	const handleFinalSubmit = () => {
		handleUpdateContract(showModal);
		setShowModal(null);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.information}>
				<Percentage data={statsData?.projected_consolidated_profitability?.toFixed(2)} />
				<Line />
				<Price data={statsData?.projected_consolidated_revenue?.toFixed(2)} />
				<Line />
			</div>
			{data?.status === 'pending_approval' ? (
				<div className={styles.button_container}>
					<Button
						themeType="accent"
						size="md"
						onClick={() => {
							setShowModal('active');
						}}
						disabled={counter !== 0 || loadingUpdate}
					>
						FINISH JOB
					</Button>
					{counter !== 0 ? (
						<div className={styles.pending}>
							Pending:
							{`${counter}/${formattedData.length}`}
						</div>
					) : null}
				</div>
			) : null}
			<SureModal
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				handleFinalSubmit={handleFinalSubmit}
				toFinish
			/>
		</div>
	);
}
export default Content;
