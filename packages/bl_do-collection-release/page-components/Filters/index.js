import { cl, Select, Toggle, Input } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

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

export default function Filters({ setStateProps, stateProps }) {
	const router = useRouter();

	const { inner_tab, activeTab, shipment_type, trade_type } = stateProps;

	const showDocumentFilter = DOCUMENT_FILTER_TABS.includes(inner_tab)
	&& activeTab === 'bl' && shipment_type === 'fcl_freight' && trade_type === 'export';

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
	}, [router.asPath]);

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
						key={uuid()}
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
					options={TRADE_TYPE_OPTIONS}
					onChange={(val) => setStateProps({
						...stateProps,
						trade_type      : val,
						document_status : undefined,
						page            : 1,
					})}
					placeholder="Trade Type"
				/>

				{ showDocumentFilter ? (
					<Select
						value={stateProps.document_status}
						options={DOCUMENT_STATUS_OPTIONS[inner_tab]}
						onChange={(val) => setStateProps({ ...stateProps, document_status: val, page: 1 })}
						placeholder="Document Status"
						className={styles.document_filter}
					/>
				) : null}

			</div>
			<div className={styles.right_filters}>
				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleVersionChange}
				/>
				<Input
					placeholder="Search SID"
					type="search"
					size="sm"
					value={stateProps.q}
					onChange={(val) => setStateProps({ ...stateProps, q: val })}
				/>
				<div className={styles.scope_container}>
					<ScopeSelect size="md" showChooseAgent={false} />
				</div>
			</div>
		</div>
	);
}
