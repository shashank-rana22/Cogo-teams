import { Loader } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import useGetMovementDetails from '../../../../hooks/useGetMovementDetails';

import styles from './styles.module.css';

function MovementDetails({ primary_service = {} }) {
	const { movement_details, shipment_id = '' } = primary_service;

	const { data = {}, loading = false } = useGetMovementDetails({ shipment_id });

	const { list = [], weight = '', piece = '' } = data;

	return (
		<div>
			<div className={styles.heading}>Expected Flight Scheduled:</div>
			{(movement_details || []).length ? (
				<div className={styles.container}>
					<div className={`${styles.airline} header`}>
						<div className="first">Flight No.</div>
						<div className="second">
							<div className="m1">From</div>

							<div className="m3"> To</div>
						</div>
					</div>
					{movement_details.map((itm) => (
						<div className={styles.airline} key={itm?.flight_number}>
							<div className="first">{itm?.flight_number}</div>
							<div className="second">
								<div className="m1">
									<div>{itm?.from_airport}</div>
									<div className="time">
										{format(
											itm?.schedule_departure,
											'dd MMM yyyy, hh:mm:ss a',
										)}
									</div>
								</div>
								<div>
									<IcMPortArrow />
								</div>
								<div className="m3">
									<div>
										{' '}
										{itm?.to_airport}
									</div>
									<div className="time">
										{format(
											itm?.schedule_arrival,
											'dd MMM yyyy, hh:mm:ss a',
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className={styles.na}>Expected Flight Details Not Available</div>
			)}
			<div className={styles.heading}>Actual Flight Scheduled:</div>
			<div>
				{(list || []).length ? (
					<>
						<div className={styles.additional_details}>
							<div>
								Piece:
								{piece}
							</div>
							<div>
								Weight:
								{weight}
							</div>
						</div>
						<div className={styles.container}>
							<div className={`${styles.airline} header`}>
								<div className="first">Flight No.</div>
								<div className="second">
									<div className="m1">From</div>

									<div className="m3"> To</div>
								</div>
							</div>
							{list.map((item) => (
								<div className={styles.airline} key={item?.flight_number}>
									<div className="first">{item?.flight_number}</div>
									<div className="second">
										<div className="m1">
											<div>{item?.origin}</div>
											<div className="time">
												{format(
													item?.schedule_departure,
													'dd MMM yyyy, hh:mm:ss a',
												)}
											</div>
										</div>
										<div>
											<IcMPortArrow />
										</div>
										<div className="m3">
											<div>
												{' '}
												{item?.destination}
											</div>
											<div className="time">
												{format(
													item?.schedule_arrival,
													'dd MMM yyyy, hh:mm:ss a',
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				) : (
					<div>
						{loading ? (
							<div className={styles.div_loader}>
								<Loader />
							</div>
						) : (
							<div className={styles.na}>Actual Flight Details Not Available</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default MovementDetails;
