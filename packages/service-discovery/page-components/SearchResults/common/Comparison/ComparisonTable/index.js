import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import getDetails from './getDetails';
import styles from './styles.module.css';

const ONE_VALUE = 1;
const EVEN_NUMBER_CONDITION = 2;
const EVEN_CONDITION_REMAINDER = 0;

function getStringBeforeAndAfterUnderscore(inputString) {
	const parts = inputString.split('_');
	const beforeUnderscore = parts[GLOBAL_CONSTANTS.zeroth_index];
	const afterUnderscore = parts.slice(ONE_VALUE).join('_');
	return { before: beforeUnderscore, after: afterUnderscore };
}

const getFinalLineItems = (lineItems) => {
	const COMPARISON_KEY = {};

	const finalLineItems = { ...lineItems };

	Object.values(finalLineItems).forEach((arr) => {
		arr.forEach((item) => {
			if (item?.code) {
				if (!isEmpty(item?.serviceObj)) {
					COMPARISON_KEY[`${item?.code}_${item?.serviceObj?.id}`] = item || '';
				} else {
					COMPARISON_KEY[item?.code] = item || '';
				}
			}
		});
	});

	return { finalLineItems, COMPARISON_KEY };
};

function TableHeader({ itemsKeys = [], LOGO_MAPPING = {} }) {
	return (
		<div className={styles.table_header}>
			<div className={styles.header_column} />

			{itemsKeys.map((key) => {
				const formattedKey = key.split('-')?.[GLOBAL_CONSTANTS.zeroth_index];
				const columnHeader = formattedKey === 'cogo_line' ? 'Cogo Assured' : startCase(formattedKey);
				const imageUrl = LOGO_MAPPING[formattedKey];

				return (
					<div key={key} className={styles.header_column}>
						<img
							src={imageUrl}
							height={32}
							alt="line"
							style={{ objectFit: 'cover' }}
						/>
						<span className={styles.line_name}>{columnHeader}</span>
					</div>
				);
			})}
		</div>
	);
}

function TableBody({ keys = {}, values = {}, mode = '' }) {
	return Object.entries(keys).map(([key, value], index) => {
		const rowClass = index % EVEN_NUMBER_CONDITION === EVEN_CONDITION_REMAINDER ? styles.even : styles.odd;
		const { serviceObj = {} } = value;

		const containerDetail = getDetails({
			primary_service : mode,
			item            : serviceObj.service,
		});

		const HIGHLIGHTED_FIELDS = ['total_landed_price', 'validity_end'];

		return (
			<div key={key} className={cl`${styles.row} ${rowClass}`}>
				<div className={cl`${styles.column} ${HIGHLIGHTED_FIELDS.includes(key) ? styles.bold : null}`}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div>{value.name}</div>

						<div>
							{!isEmpty(serviceObj)
								? (containerDetail || []).map((item) => (
									<span className={styles.item_details} key={item}>
										{item}
									</span>
								))
								: null}
						</div>
					</div>
				</div>

				{Object.entries(values).map(([shipping_line, lineItem]) => {
					const lineItemObj =	lineItem.find((childItem) => {
						if (!isEmpty(childItem.serviceObj)) {
							return (
								childItem?.code === getStringBeforeAndAfterUnderscore(key).before
								&& childItem?.serviceObj?.id === getStringBeforeAndAfterUnderscore(key).after
							);
						}
						return childItem?.code === key;
					}) || {};

					if (key.includes('THC')) {
						return (
							<div key={`${key}_${shipping_line}`} className={styles.column}>
								{lineItemObj.value || '*At actuals'}
							</div>
						);
					}

					if (HIGHLIGHTED_FIELDS.includes(key)) {
						return (
							<div
								key={`${key}_${shipping_line}`}
								className={cl`${styles.column} ${styles.bold}`}
							>
								{lineItemObj.value}
							</div>
						);
					}

					return (
						<div key={`${key}_${shipping_line}`} className={styles.column}>
							{lineItemObj.value || '-'}
						</div>
					);
				})}
			</div>
		);
	});
}

function Table({
	staticKeys = {},
	dynamicKeys = {},
	staticLineItems = {},
	dynamicLineitems = {},
	LOGO_MAPPING = {},
	mode = '',
}) {
	const itemsKeys = Object.keys({ ...staticLineItems, ...dynamicLineitems });

	const { validity_end = {}, ...restStaticKeys } = staticKeys;

	return (
		<div className={styles.table}>
			<TableHeader itemsKeys={itemsKeys} LOGO_MAPPING={LOGO_MAPPING} />

			<div className={styles.table_body}>
				{isEmpty(validity_end) ? null : (
					<TableBody keys={{ validity_end }} values={staticLineItems} mode={mode} />
				)}

				<TableBody keys={dynamicKeys} values={dynamicLineitems} mode={mode} />
				<TableBody keys={restStaticKeys} values={staticLineItems} mode={mode} />
			</div>
		</div>
	);
}

function ComparisonTable({
	staticLineItems = {},
	dynamicLineItems = {},
	summary = {},
	LOGO_MAPPING = {},
	mode = 'fcl_freight',
}) {
	const {
		finalLineItems: newStaticLineItems,
		COMPARISON_KEY: staticKeys,
	} = getFinalLineItems(staticLineItems);

	const {
		finalLineItems: newDynamicLineItems,
		COMPARISON_KEY: dynamicKeys,
	} = getFinalLineItems(dynamicLineItems);

	return (
		<div className={styles.container}>
			<Table
				staticKeys={staticKeys}
				dynamicKeys={dynamicKeys}
				staticLineItems={newStaticLineItems}
				dynamicLineitems={newDynamicLineItems}
				summary={summary}
				LOGO_MAPPING={LOGO_MAPPING}
				mode={mode}
			/>
		</div>
	);
}

export default ComparisonTable;
