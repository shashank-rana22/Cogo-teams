import { Popover, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import AddSop from '../AddSop';
import SopFilters from '../Filters';
import ShowCurrentFilters from '../Filters/AppliedFilters';

import styles from './styles.module.css';

function Header({
	filters = [],
	setFilters = () => {},
	reload = false,
	setReload = () => {},
	trade_partners_details,
	shipment_data,
	primary_service,
}) {
	const [sopaddForm, setSopAddForm] = useState(false);
	const [showFilter, setShowFilters] = useState(false);

	let updatePermission = true;

	if (![true, false].includes(updatePermission)) {
		updatePermission = true;
	}

	return (
		<div className={styles.container}>
			<div className={styles.buttons_container}>
				<div className={styles.filter_container}>
					<Popover
						theme="light"
						show={showFilter}
						visible={showFilter}
						onClose={() => setShowFilters(false)}
						onClickOutside={false}
						placement="bottom"
						interactive
						content={(
							<SopFilters
								primary_service={primary_service}
								trade_partners_details={trade_partners_details}
								filters={filters}
								setFilters={setFilters}
								setShowFilters={setShowFilters}
							/>
						)}
					>
						<div
							role="button"
							tabIndex={0}
							className={styles.filter_button}
							onClick={() => setShowFilters(true)}
						>
							<IcMFilter />
						</div>
					</Popover>

					<ShowCurrentFilters
						filters={filters}
						setFilters={setFilters}
						trade_partners_details={trade_partners_details}
						primary_service={primary_service}
					/>
				</div>
				{updatePermission && (
					<Button className="primary sm" onClick={() => setSopAddForm(true)}>
						+ Add SOP
					</Button>
				)}
			</div>

			{sopaddForm ? (
				<AddSop
					shipment_data={shipment_data}
					primary_service={primary_service}
					trade_partners_details={trade_partners_details}
					setSopAddForm={setSopAddForm}
					reload={reload}
					setReload={setReload}
				/>
			) : null}
		</div>
	);
}
export default Header;
