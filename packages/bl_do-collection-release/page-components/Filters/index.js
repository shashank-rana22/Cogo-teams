import { cl, Select, Toggle, Input } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';

import ClickableDiv from '../../commons/ClickableDiv';
import TAB_CONFIG from '../../configs/TAB_CONFIG.json';

import styles from './styles.module.css';

const TRADE_TYPE_OPTIONS = [
	{ label: 'Export', value: 'export' },
	{ label: 'Import', value: 'import' },
];

const DOCUMENT_STATUS_OPTIONS = {
	released:
	[{ label: 'Released', value: 'released' },
		{ label: 'Delivered', value: 'delivered' }],
	surrendered:
	[{ label: 'Pending', value: 'surrender_pending' },
		{ label: 'Surrendered', value: 'surrendered' }],
};

const DOCUMENT_FILTER_TABS = ['surrendered', 'released'];

export default function Filters({ setStateProps = () => {}, stateProps = {} }) {
	const { inner_tab, activeTab, shipment_type, trade_type } = stateProps || {};

	const showDocumentFilter = DOCUMENT_FILTER_TABS.includes(inner_tab)

    && activeTab === 'bl' && shipment_type === 'fcl_freight' && trade_type === 'export';

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
						onClick={() => setStateProps({
							...stateProps,
							shipment_type   : item.value,
							page            : 1,
							document_status : undefined,
						})}
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
					options={TRADE_TYPE_OPTIONS}
					onChange={(val) => setStateProps({
						...stateProps,
						trade_type      : val,
						page            : 1,
						document_status : undefined,
					})}
					placeholder="Trade Type"
					className={styles.select_filter}
				/>
				{ showDocumentFilter ? (
					<Select
						value={stateProps.document_status}
						options={DOCUMENT_STATUS_OPTIONS[inner_tab]}
						isClearable
						onChange={(val) => setStateProps({ ...stateProps, document_status: val, page: 1 })}
						placeholder="Document Status"
						className={styles.document_filter}
					/>
				) : null}

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
