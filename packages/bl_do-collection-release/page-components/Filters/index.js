import { cl, Select, Input } from '@cogoport/components';

import ClickableDiv from '../../commons/ClickableDiv';
import TAB_CONFIG from '../../configs/TAB_CONFIG.json';

import styles from './styles.module.css';

const options = [
	{ label: 'Export', value: 'export' },
	{ label: 'Import', value: 'import' },
];

export default function Filters({ setStateProps = () => {}, stateProps = {} }) {
	return (
		<div>
			<div className={styles.inner_tabs}>

				<div className={styles.service_tabs}>
					{
				TAB_CONFIG.SHIPMENT_TYPES.map((item) => (
					<ClickableDiv onClick={() => setStateProps({ ...stateProps, shipment_type: item.value })}>
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
						options={options}
						onChange={(val) => setStateProps({ ...stateProps, trade_type: val })}
						placeholder
					/>
				</div>
				<div>
					<Input
						placeholder="Search SID"
						type="search"
						size="sm"
						value={stateProps.q}
						onChange={(val) => setStateProps({ ...stateProps, q: val })}
					/>
				</div>
			</div>
			<div className={styles.service_tabs}>
				{
			TAB_CONFIG.TABS.map((item) => (
				<ClickableDiv onClick={() => setStateProps({ ...stateProps, inner_tab: item.value })}>
					<div className={cl`${stateProps.inner_tab === item.value ? styles.active : ''} 
				${styles.service_tab}`}
					>
						{item.label}

					</div>
				</ClickableDiv>
			))
	}
			</div>
		</div>
	);
}
