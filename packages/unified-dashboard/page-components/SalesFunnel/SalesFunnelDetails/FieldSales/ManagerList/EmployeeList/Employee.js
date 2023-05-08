import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import Shipment from '../../../../../../common/SaleShipmentTable';
import AfterHeader from '../../../../../../common/SaleShipmentTable/AfterHeader';
import useListShipments from '../../../../../../hooks/useListShipments';
import NoData from '../NoData';
import { v4 as uuidv4 } from 'uuid';

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
	}, [filters, showShipments, setFilters, val?.manager_id]);

	return (
		<>
			<div className={styles.card_wrapper}>
				<div
					className={styles.view_btn}
					style={{ left: `${50 + employeePad}` }}
					onClick={() => {
						setShowShipments(!showShipments);
						setShowGrid(false);
					}}
					role="button"
					tabIndex="0"
				>
					{showShipments ? 'Hide' : 'View'}
					{' '}
					Shipments
				</div>
				<div className={styles.row}>
					<div
						className={styles.revenue_arrow}
						onClick={() => {
							if (val?.employees?.length > 0) {
								setShowGrid(!showGrid);
								setShowShipments(false);
							}
						}}
						style={{ paddingLeft: `${employeePad}px` }}
						role="button"
						tabIndex="0"
					>
						<div className={styles.flex}>
							<IcMArrowRotateDown
								className={showGrid ? styles.colllapse_icon_active : styles.colllapse_icon_inactive}
								style={{ color: val?.employees?.length > 0 ? 'black' : 'grey' }}
							/>
							<div>
								<div>{val.user_name}</div>
								<div>
									{val.role_name?.length && (
										<>
										&nbsp;
											<span className={styles.role_name}>
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
								amount  : val?.stats?.quotations?.amount || 0,
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
							{val?.stats?.quotations?.count}
						</div>
						<div className={styles.revenue_col}>
							{val?.stats?.quotations?.customers_count}
						</div>
					</div>

					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col}>
							{formatAmount({
								amount  : val?.stats?.booking_confirmed?.amount || 0,
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
							{val?.stats?.booking_confirmed?.count}
						</div>
						<div className={styles.revenue_col}>
							{val?.stats?.booking_confirmed?.customers_count}
						</div>
					</div>

					<div className={styles.revenue_gap}>
						<div className={styles.revenue_col}>
							{formatAmount({
								amount  : val?.stats?.invoices?.amount || 0,
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
							{val?.stats?.invoices?.customers_count || 0}
						</div>
					</div>

				</div>
			</div>
			{showGrid && val?.employees?.length > 0 ? (
				<>
					{val?.user_name?.toLowerCase() !== 'others' && (
						<Employee
							val={{
								user_name  : 'Self',
								manager_id : val.manager_id,
								...val.self,
							}}
							currency={currency}
							filters={filters}
							employeePad={employeePad + 20}
						/>
					)}
					{val?.employees?.map((employee) => (
						<Employee
							key={uuidv4()}
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
