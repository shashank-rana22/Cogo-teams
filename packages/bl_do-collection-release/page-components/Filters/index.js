import { cl, Select, Toggle, Input } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';

import ClickableDiv from '../../commons/ClickableDiv';
import TAB_CONFIG from '../../configs/TAB_CONFIG.json';

import styles from './styles.module.css';

const trade_type_options = [
	{ label: 'Export', value: 'export' },
	{ label: 'Import', value: 'import' },
];

export default function Filters({ setStateProps, stateProps }) {
	const {
		readyToReleaseVisible,
		readyToCollectVisible,
	} =	TAB_CONFIG.TABS.find((tab) => tab.value === stateProps.inner_tab) || {};

	return (
		<div className={styles.inner_tabs}>

			<div className={styles.service_tabs}>
				{
				TAB_CONFIG.SHIPMENT_TYPES.map((item) => (
					<ClickableDiv
						onClick={() => setStateProps({ ...stateProps, shipment_type: item.value, page: 1 })}
						key={item?.value}
					>
						<div className={cl`${stateProps.shipment_type === item.value ? styles.active : ''} 
						 ${styles.service_tab}`}
						>
							{item.label}
						</div>
					</ClickableDiv>
				))
			}
				<Select
					value={stateProps.trade_type}
					size="sm"
					options={trade_type_options}
					onChange={(val) => setStateProps({ ...stateProps, trade_type: val, page: 1 })}
					placeholder="Trade Type"
					className={styles.select_filter}
				/>

				{readyToCollectVisible
					? (
						<div className={styles.ready_to_collect}>
							<div className={styles.text}>
								Ready to Collect
							</div>
							<Toggle
								name="ready_to_collect"
								value={stateProps}
								size="md"
								disabled={false}
								onChange={() => {
									setStateProps({
										...stateProps,
										ready_to_collect: !stateProps.ready_to_collect,
									});
								}}
							/>

						</div>
					)
					: null}
				{readyToReleaseVisible
					? (
						<div className={styles.ready_to_collect}>
							<div className={styles.text}>
								Ready to Release
							</div>
							<Toggle
								name="ready_to_release"
								value={stateProps}
								size="md"
								disabled={false}
								onChange={() => {
									setStateProps({
										...stateProps,
										ready_to_release: !stateProps.ready_to_release,
									});
								}}
							/>

						</div>
					)
					: null}

			</div>
			<div className={styles.right_filters}>
				<Input
					placeholder={stateProps.activeTab === 'bl' ? 'Search by SID, BL No.' : 'Search by SID'}
					type="search"
					size="sm"
					value={stateProps.q}
					onChange={(val) => setStateProps({ ...stateProps, q: val })}
					className={styles.search_filter}
				/>
				<div className={styles.scope_container}>
					<ScopeSelect size="md" showChooseAgent={false} />
				</div>
			</div>
		</div>
	);
}
