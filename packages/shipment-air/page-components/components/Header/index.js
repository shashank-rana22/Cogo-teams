import { Tabs, TabPanel, Input, Popover,ButtonIcon } from '@cogoport/components';
import { IcMAppSearch, IcMFilter ,IcMCross} from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select/components';
import { useState,useEffect } from 'react';

import serviceWiseTabMappings from '../../constants/service-tabs-mappings';
import shipmentStateMappings from '../../constants/shipment-state-mappings';
import { isEmpty }  from'@cogoport/utils';
import Filter from './Filter';
import styles from './styles.module.css';

function Header({
	serviceActiveTab,
	setServiceActiveTab,
	shipmentStateTab,
	setShipmentStateTab,
	debounceQuery,
	setFilters,
	filters,
}) {
	const [filterPopover, setFilterPopover] = useState(false);
	const [searchValue,setSearchValue]=useState('');	

	useEffect(()=>{
		debounceQuery(searchValue);
	},[searchValue])
	return (
		<div>
			<Tabs
				fullWidth
				themeType="primary"
				activeTab={serviceActiveTab}
				onChange={setServiceActiveTab}
				className={styles.header_service_tab}

			>
				{serviceWiseTabMappings.map((item) => {
					const { name = '', title = '' } = item;
					return (
						<TabPanel
							key={name}
							name={name}
							title={title}
						/>
					);
				})}
			</Tabs>
			<div className={styles.header_footer_part}>

				<Tabs
					themeType="tertiary"
					activeTab={shipmentStateTab}
					onChange={setShipmentStateTab}
				>
					{shipmentStateMappings.map((item) => {
						const { name = '', title = '' } = item;
						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							/>
						);
					})}
				</Tabs>
				<div className={styles.header_footer_filter_part}>
					<div className={styles.scope_select_wrapper}>
						<ScopeSelect size="md" apisToConsider={['list_shipments']} />
					</div>

					<Input
						size="sm"
						prefix={<IcMAppSearch />}
						placeholder="Search via Customer/SID/Booking No"
						style={{ marginRight: '8px', width: 350 }}
						onChange={(e) => setSearchValue(e)}
						value={searchValue}
						suffix={<ButtonIcon onClick={()=>setSearchValue('')} size="sm" icon={<IcMCross />} disabled={isEmpty(searchValue)} />}
					/>
					<div className={styles.icon_wrapper}>
						<Popover
							placement="left"
							caret={false}
							render={(
								<Filter
									serviceActiveTab={serviceActiveTab}
									setFilters={setFilters}
									filters={filters}
									setFilterPopover={setFilterPopover}
								/>
							)}
							width={300}
							visible={filterPopover}
							shipmentType={serviceActiveTab}
							onClickOutside={() => setFilterPopover(false)}
						>
							<IcMFilter onClick={() => setFilterPopover((pev) => !pev)} />
						</Popover>

					</div>

				</div>
			</div>

		</div>
	);
}
export default Header;
