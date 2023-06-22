import { Button } from '@cogoport/components';
import React from 'react';

import getElementController from '../../../../../../../../../configs/getElementController';

import styles from './styles.module.css';

function FilterContent({
	controls = [],
	fields = {},
	reset = () => {},
	applyFilters = () => {},
	setOpen = () => {},
	service = '',
}) {
	const handleClick = () => {
		applyFilters();
		setOpen(false);
	};

	const handleReset = () => {
		reset();
		setOpen(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Filters</div>

			<div className={styles.controls}>
				<div
					style={{ padding: '0px 22px 14px 18px' }}
				>
					{(controls || [])
						.filter((item) => [
							'serial_id',
							'importer_exporter_id',
							'sales_agent_id',
							'partner_id',
							'enquiry_status',
							'reverted_by',
						].includes(item.name))
						.map((control) => {
							const Element = getElementController(control.type);
							return (
								control.show !== false && (
									<div className={styles.item}>
										<div className={styles.label}>{control.label}</div>
										<Element {...fields[control.name]} />
									</div>
								)
							);
						})}
				</div>

				{[
					'export_fcl_freight',
					'import_fcl_freight',
					'export_lcl_freight',
					'import_lcl_freight',
					'export_air_freight',
					'import_air_freight',
					'trailer_freight',
					'ftl_ltl_freight',
					'haulage_freight',
				].includes(service) ? (
					<>
						<div style={{ borderRight: '1px solid #e0e0e0' }} />

						<div
							style={{ padding: '0px 22px 14px 18px' }}
						>
							<div className={styles.label_heading}>Origin</div>
							{(controls || []).map((control) => {
								const Element = getElementController(control.type);
								return (
									control.show !== false
									&& [
										'origin_trade_id',
										'origin_country_id',
										'origin_continent_id',
										'origin_port_id',
										'origin_airport_id',
									].includes(control?.name) && (
										<div className={styles.item}>
											<div className={styles.label}>{control.label}</div>
											<Element {...fields[control.name]} />
										</div>
									)
								);
							})}

							<div className={styles.line} />
							<div className={styles.label_heading}>Destination</div>
							{(controls || []).map((control) => {
								const Element = getElementController(control.type);
								return (
									control.show !== false
									&& [
										'destination_trade_id',
										'destination_country_id',
										'destination_continent_id',
										'destination_port_id',
										'destination_airport_id',
									].includes(control?.name) && (
										<div className={styles.item}>
											<div className={styles.label}>{control.label}</div>
											<Element {...fields[control.name]} />
										</div>
									)
								);
							})}
						</div>
					</>
					) : null}

				{['fcl_cfs', 'fcl_customs', 'lcl_customs', 'air_customs'].includes(
					service,
				) ? (
					<>
						<div style={{ borderRight: '1px solid #e0e0e0' }} />

						<div
							style={{ padding: '0px 22px 14px 18px' }}
						>
							{(controls || [])
								.filter((item) => ['trade_type'].includes(item.name))
								.map((control) => {
									const Element = getElementController(control.type);
									return (
										control.show !== false && (
											<div className={styles.item}>
												<div className={styles.label}>{control.label}</div>
												<Element {...fields[control.name]} />
											</div>
										)
									);
								})}

							{(controls || [])
								.filter((item) => ['trade_id', 'country_id', 'continent_id'].includes(
									item.name,
								))
								.map((control) => {
									const Element = getElementController(control.type);
									return (
										control.show !== false && (
											<div className={styles.item}>
												<div className={styles.label}>{control.label}</div>
												<Element {...fields[control.name]} />
											</div>
										)
									);
								})}
						</div>
					</>
					) : null}
			</div>

			<div
				className={styles.button_wrap}
				style={{
					padding        : '12px 28px 12px 0px',
					display        : 'flex',
					justifyContent : 'flex-end',
				}}
			>
				<Button onClick={() => handleReset()} id="clear_button">
					CLEAR
				</Button>

				<Button
					style={{
						marginLeft: '14px',
					}}
					onClick={() => setOpen(false)}
					id="cancel_button"
				>
					CANCEL
				</Button>

				<Button
					onClick={() => handleClick()}
					style={{
						background : '#000000',
						color      : '#ffffff',
						marginLeft : '14px',
					}}
					id="save_button"
				>
					APPLY
				</Button>
			</div>
		</div>
	);
}
export default FilterContent;
