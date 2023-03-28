import { Button, Input } from '@cogoport/components';
import { useState } from 'react';

import {
	getAgentsData, getAirData, getAllShipment,
	getOceanData, getProjectData, getRailData, getSurfaceData,
} from '../contant';

import styles from './styles.module.css';

function SalaryAndRent({ setGlobalStepper }) {
	const [edit, setEdit] = useState({});

	const handleEdit = (key = '') => {
		setEdit((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};
	return (
		<div>
			<div className={styles.card}>
				<div
					className={styles.card_data}
					role="presentation"
				>
					<div className={styles.flex_header}>
						Turnover Ratio By Revenue
						<div className={styles.small_font}>( All Amounts in INR )</div>
					</div>

				</div>

				<div className={styles.data_value}>
					{getAllShipment.map((itemShipment) => (
						<div className={styles.shipment_container}>
							<div className={styles.header}>
								<div>{itemShipment?.label}</div>
								<div
									className={styles.icon_edit}
									onClick={() => { handleEdit(itemShipment?.id); }}
									role="presentation"
								>
									{itemShipment?.icon}

								</div>
							</div>

							<div className={styles.shipment_data}>
								{itemShipment?.label === 'Ocean' && (
									<div className={styles.ocean}>
										{getOceanData.map((valOcean) => (

											<div>
												<div className={styles.name}>
													{valOcean?.name}
												</div>
												<div className={styles.value}>
													{edit[itemShipment?.id]
														? <Input placeholder="Type" /> : valOcean?.value}
												</div>
											</div>

										))}
									</div>

								)}

								{itemShipment?.label === 'Air' && 	(
									<div className={styles.ocean}>
										{getAirData.map((valOcean) => (

											<div>
												<div className={styles.name}>
													{valOcean?.name}
												</div>
												<div className={styles.value}>
													{edit[itemShipment?.id]
														? <Input placeholder="Type" /> : valOcean?.value}

												</div>
											</div>

										))}
									</div>
								)}

								{itemShipment?.label === 'Surface' && 	(
									<div className={styles.ocean}>
										{getSurfaceData.map((valOcean) => (

											<div>
												<div className={styles.name}>
													{valOcean?.name}
												</div>
												<div className={styles.value}>
													{edit[itemShipment?.id]
														? <Input placeholder="Type" /> : valOcean?.value}
												</div>
											</div>

										))}
									</div>
								)}

								{itemShipment?.label === 'Rail' && 	(
									<div className={styles.ocean}>
										{getRailData.map((valOcean) => (

											<div>
												<div className={styles.name}>
													{valOcean?.name}
												</div>
												<div className={styles.value}>
													{edit[itemShipment?.id]
														? <Input placeholder="Type" /> : valOcean?.value}
												</div>
											</div>

										))}
									</div>
								)}

								{itemShipment?.label === 'Projects' && (
									<div className={styles.ocean}>
										{getProjectData.map((valOcean) => (

											<div>
												<div className={styles.name}>
													{valOcean?.name}
												</div>
												<div className={styles.value}>
													{edit[itemShipment?.id]
														? <Input placeholder="Type" /> : valOcean?.value}
												</div>
											</div>

										))}
									</div>
								)}

								{itemShipment?.label === 'Agents' && 	(
									<div className={styles.ocean}>
										{getAgentsData.map((valOcean) => (

											<div>
												<div className={styles.name}>
													{valOcean?.name}
												</div>
												<div className={styles.value}>
													{edit[itemShipment?.id]
														? <Input placeholder="Type" /> : valOcean?.value}
												</div>
											</div>

										))}
									</div>
								)}

							</div>
						</div>
					))}
				</div>
			</div>

			<div
				className={styles.flex_button}
				onClick={() => {
					setGlobalStepper('review_details');
				}}
				role="presentation"
			>
				<Button>Save & Next </Button>

			</div>
		</div>

	);
}
export default SalaryAndRent;
