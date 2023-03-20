import { Button } from '@cogoport/components';
import React from 'react';

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

	const mapping = {};

	const getField = (type) => {
		const element = mapping[type] || null;

		if (!element) {
			return function () {
				return (
					<div>
						No element found
						{type}
					</div>
				);
			};
		}

		return element;
	};

	return (
		<div className={styles.filter_container}>
			<div className={styles.filter_heading}>Filters</div>
			<div className={styles.filter_controls}>
				<div className={styles.filter_block}>
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
							const Element = getField(control.type);
							return (
								control.show !== false && (
									<div className={styles.filter_item}>
										<div className={styles.filter_label}>{control.label}</div>
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
						<div className={styles.filter_bottomborder} />

						<div className={styles.filter_block}>
							<div className={styles.filter_label_heading}>Origin</div>
							{(controls || []).map((control) => {
								const Element = getField(control.type);
								return (
									control.show !== false
									&& [
										'origin_trade_id',
										'origin_country_id',
										'origin_continent_id',
										'origin_port_id',
										'origin_airport_id',
									].includes(control?.name) && (
										<div className={styles.filter_item}>
											<div className={styles.filter_label}>{control.label}</div>
											<Element {...fields[control.name]} />
										</div>
									)
								);
							})}

							<div className={styles.line} />
							<div className={styles.filter_label_heading}>Destination</div>
							{(controls || []).map((control) => {
								const Element = getField(control.type);
								return (
									control.show !== false
									&& [
										'destination_trade_id',
										'destination_country_id',
										'destination_continent_id',
										'destination_port_id',
										'destination_airport_id',
									].includes(control?.name) && (
										<div className={styles.filter_item}>
											<div className={styles.filter_label}>{control.label}</div>
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
						<div className={styles.filter_bottomborder} />

						<div className={styles.filter_block}>
							{(controls || [])
								.filter((item) => ['trade_type'].includes(item.name))
								.map((control) => {
									const Element = getField(control.type);
									return (
										control.show !== false && (
											<div className={styles.filter_item}>
												<div className={styles.filter_label}>{control.label}</div>
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
									const Element = getField(control.type);
									return (
										control.show !== false && (
											<div className={styles.filter_item}>
												<div className={styles.filter_label}>{control.label}</div>
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
			>
				<Button onClick={() => handleReset()} id="clear_button">
					CLEAR
				</Button>

				<Button
					className={styles.cancel_btn}
					onClick={() => setOpen(false)}
					id="cancel_button"
				>
					CANCEL
				</Button>

				<Button
					onClick={() => handleClick()}
					className={styles.apply_btn}
					id="save_button"
				>
					APPLY
				</Button>
			</div>
		</div>
	);
}
export default FilterContent;
