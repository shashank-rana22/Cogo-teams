import { cl, Select, Toggle, Input } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import ClickableDiv from '../../commons/ClickableDiv';
import TAB_CONFIG from '../../configs/TAB_CONFIG.json';

import styles from './styles.module.css';

const trade_type_options = [
	{ label: 'Export', value: 'export' },
	{ label: 'Import', value: 'import' },
];

export default function Filters({ setStateProps, stateProps }) {
	const router = useRouter();

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
						onClick={() => setStateProps({ ...stateProps, shipment_type: item.value, page: 1 })}
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
					options={trade_type_options}
					onChange={(val) => setStateProps({ ...stateProps, trade_type: val, page: 1 })}
					placeholder="Trade Type"
				/>
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
