import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import Shipment from '../../../../../../common/SaleShipmentTable';
import AfterHeader from '../../../../../../common/SaleShipmentTable/AfterHeader';
import useListShipments from '../../../../../../hooks/useListShipments';
import NoData from '../NoData';

import styles from './styles.module.css';

function Employee({ val = {}, currency, filters, employeePad = 20 }) {
	const [showGrid, setShowGrid] = useState(false);
	const [showShipments, setShowShipments] = useState(false);
	const { shipments, setFilters, loading } = useListShipments();

	useEffect(() => {
		if (showShipments) {
			setFilters((prevFilters) => ({
				...prevFilters,
				...filters,
				agent_id: val?.manager_id,
			}));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, showShipments]);

	return (
		<>
			<div className={styles.card_wrapper}>
				<div
					role="button"
					tabIndex="0"
					className={styles.view_btn}
					style={{ left: `${50 + employeePad}` }}
					onClick={() => {
						setShowShipments(!showShipments);
						setShowGrid(false);
					}}
				>
					{showShipments ? 'Hide' : 'View'}
					{' '}
					Shipments
				</div>
				<div className={styles.row}>
					<div
						role="button"
						tabIndex="0"
						className={styles.revenue_arrow}
						onClick={() => {
							if (val?.employees?.length > 0) {
								setShowGrid(!showGrid);
								setShowShipments(false);
							}
						}}
						style={{ paddingLeft: `${employeePad}px` }}
					>
						<div className={styles.flex}>
							<IcMArrowRotateDown
								className={showGrid ? styles.colllapse_icon_active : styles.colllapse_icon_inactive}
								style={{ color: val?.employees?.length > 0 ? 'black' : 'grey' }}
							/>
							<div>
								<div>
									{val.name}
								</div>
								<div>
									{val.role_name?.length && (
										<>
										&nbsp;
											<span className="role-name">
												(
												{val.role_name}
												)
											</span>
										</>
									)}
								</div>
							</div>

						</div>
					</div>
					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col}>
							{formatAmount({
								amount  : val?.quote_sent?.amount || 0,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</div>
						<div className={styles.revenue_col}>
							{val?.quote_sent?.quotations_count}
						</div>
						<div className={styles.revenue_col}>
							{val?.quote_sent?.customers_count}
						</div>
					</div>

					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col}>
							{formatAmount({
								amount  : val?.bookings_confirmed?.amount || 0,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</div>
						<div className={styles.revenue_col}>
							{val?.bookings_confirmed?.booking_confirmed_count}
						</div>
						<div className={styles.revenue_col}>
							{val?.bookings_confirmed?.customers_count}
						</div>
					</div>

					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col}>
							{formatAmount({
								amount  : val?.revenue?.revenue_amount || 0,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</div>

						<div className={styles.revenue_col}>
							{val?.revenue?.customers_count || 0}
						</div>
					</div>

				</div>
			</div>
			{showGrid && val?.employees?.length > 0 ? (
				<>
					{val?.name?.toLowerCase() !== 'others' && (
						<Employee
							val={{
								name       : 'Self',
								manager_id : val.manager_id,
								...val.my_stats,
							}}
							currency={currency}
							filters={filters}
							employeePad={employeePad + 20}
						/>
					)}
					{val?.employees?.map((employee) => (
						<Employee
							val={employee}
							currency={currency}
							filters={filters}
							employeePad={employeePad + 20}
						/>
					))}
				</>
			) : (
				<NoData showGrid={showGrid} entity="Employees" />
			)}
			{showShipments && shipments?.list?.length > 0 ? (
				<>
					<AfterHeader showGrid={showShipments} />
					{shipments?.list?.map((shipment) => (
						<Shipment itemData={shipment} />
					))}
				</>
			) : (
				<div>
					{!loading && <NoData showGrid={showShipments} />}
				</div>
			)}
		</>
	);
}

export default Employee;
