import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

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

function compareByArrayLength(a, b) {
	const aKey = Object.keys(a)[GLOBAL_CONSTANTS.zeroth_index];
	const bKey = Object.keys(b)[GLOBAL_CONSTANTS.zeroth_index];
	return b[bKey].length - a[aKey].length;
}

function Table({ comparisonKey, allLineItems, LOGO_MAPPING, mode }) {
	const renderTableHeader = () => (
		<div className={styles.table_header}>
			<div className={styles.header_column} />

			{allLineItems.map((item) => {
				const key = Object.keys(item)[GLOBAL_CONSTANTS.zeroth_index];
				const columnHeader = key === 'cogo_line' ? 'Cogo Assured' : startCase(key);
				const imageUrl = LOGO_MAPPING[key];

				return (
					<div key={key} className={styles.header_column}>
						{imageUrl ? (
							<img src={imageUrl} alt="shipping-line" style={{ objectFit: 'cover', width: 92 }} />
						) : columnHeader}
					</div>
				);
			})}
		</div>
	);

	const renderTableBody = () => Object.entries(comparisonKey).map(([key, value], index) => {
		const rowClass = index % EVEN_NUMBER_CONDITION === EVEN_CONDITION_REMAINDER ? styles.even : styles.odd;
		const { serviceObj = {} } = value;

		const containerDetail = getDetails({
			primary_service : mode,
			item            : serviceObj.service,
		});

		return (
			<div key={key} className={`${styles.row} ${rowClass}`}>

				<div className={`${styles.column} ${key === 'total_landed_price' ? styles.bold : {}}`}>
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

				{allLineItems.map((item) => {
					const [lineItem] = Object.values(item);

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
							<div key={key} className={styles.column}>
								{lineItemObj.value || '*At actuals'}
							</div>
						);
					}

					if (key === 'total_landed_price') {
						return (
							<div
								key={key}
								className={`${styles.column} ${styles.bold}`}
							>
								{lineItemObj.value}
							</div>
						);
					}

					return (
						<div key={key} className={styles.column}>
							{lineItemObj.value || '-'}
						</div>
					);
				})}
			</div>
		);
	});

	return (
		<div className={styles.table}>
			{renderTableHeader()}

			<div className={styles.table_body}>{renderTableBody()}</div>
		</div>
	);
}

function ComparisonTable({ allLineItems = [], summary = {}, LOGO_MAPPING = {}, mode = 'fcl_freight' }) {
	const newAllLineItems = [...allLineItems];

	newAllLineItems.sort(compareByArrayLength);

	const COMPARISON_KEY = {};

	newAllLineItems.forEach((obj) => {
		Object.values(obj).forEach((arr) => {
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
	});

	return (
		<div className={styles.container}>
			<Table
				comparisonKey={COMPARISON_KEY}
				allLineItems={newAllLineItems}
				summary={summary}
				LOGO_MAPPING={LOGO_MAPPING}
				mode={mode}
			/>
		</div>
	);
}

export default ComparisonTable;
