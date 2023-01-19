import { Pill, Button } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Line from '../../../../common/Line';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';
import SureModal from '../../../../common/SureModal';

import styles from './styles.module.css';

function Header({ activePair, handleUpdateContract, data, stats }) {
	const [showModal, setShowModal] = useState(null);

	const handleCloseModal = () => {
		setShowModal(null);
	};
	const handleFinalSubmit = () => {
		handleUpdateContract(showModal);
	};
	const keys = ['commodity', 'container_size', 'container_type',
		'trade_type', 'containers_count', 'inco_term', 'weight', 'packing_type', 'volume', 'max_weight'];
	const keysToMap = {
		container_size   : 'ft',
		containers_count : 'Container',
		weight           : {
			lcl_freight : 'Mt',
			air_freight : 'Kg',
		},
		volume     : 'CBM',
		max_weight : 'Weight',
	};
	const originCode = activePair?.origin_code;
	const originName = activePair?.origin?.split('(')[0];
	const destinationCode = activePair?.destination_code;
	const destinationName = activePair?.destination?.split('(')[0];
	return (
		<div className={styles.heading}>
			<div className={styles.port_pair}>

				<div>
					{`${originName}(${originCode})`}
				</div>
				<IcMPortArrow />
				<div>
					{`${destinationName}(${destinationCode})`}
				</div>
			</div>

			<div className={styles.pills}>
				{keys.map((item) => {
					const content = item === 'weight' ? `${activePair[item]} 
					${keysToMap[item][activePair?.service_type]}`
						: `${activePair[item]} ${keysToMap[item]}`;
					return (
						<div>
							{activePair[item] ? (
								<Pill
									size="md"
									color="#DFE1EF"
								>
									{Object.keys(keysToMap).includes(item)
										? content
										: startCase(activePair[item])}
								</Pill>
							) : null}
						</div>
					);
				})}
			</div>
			<div className={styles.actions}>
				<div className={styles.stats}>
					<Price heading="Requested Price" data={stats?.price?.toFixed(2)} />
					<Line />
					<Percentage
						heading="Profitability in the next 30 days"
						data={stats?.profitability?.toFixed(2)}
					/>
					<Line />
				</div>
				<div>
					{data?.status === 'pending_approval' && activePair?.status === 'quoted' ? (
						<div className={styles.buttons}>
							<Button
								themeType="secondary"
								size="md"
								onClick={() => {
									setShowModal({
										payload: {
											id           : activePair?.id,
											service_type : activePair?.service_type,
											status       : 'rejected',
										},
									});
								}}
							>
								Reject
							</Button>
							<Button
								size="md"
								themeType="accent"
								onClick={() => {
									setShowModal({
										payload: {
											id           : activePair?.id,
											service_type : activePair?.service_type,
											status       : 'approved',
										},
									});
								}}
							>
								Approve
							</Button>
						</div>
					) : (
						<Pill
							color={activePair?.status === 'rejected' ? 'red' : 'green'}
							style={{
								padding     : '4px',
								marginRight : '34px',
							}}
						>
							{activePair?.status === 'rejected' ? 'Rejected' : 'Approved'}
						</Pill>
					)}

				</div>
			</div>
			<SureModal
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				handleFinalSubmit={handleFinalSubmit}
			/>
		</div>
	);
}

export default Header;
