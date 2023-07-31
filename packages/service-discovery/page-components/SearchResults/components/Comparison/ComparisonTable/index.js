import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function compareByArrayLength(a, b) {
	const aKey = Object.keys(a)[GLOBAL_CONSTANTS.zeroth_index];
	const bKey = Object.keys(b)[GLOBAL_CONSTANTS.zeroth_index];
	return b[bKey].length - a[aKey].length;
}

function Table({ comparisonKey, allLineItems, LOGO_MAPPING }) {
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
							<img src={imageUrl} alt="shipping-line" style={{ objectFit: 'cover', width: 88 }} />
						) : columnHeader}
					</div>
				);
			})}
		</div>
	);

	const renderTableBody = () => Object.entries(comparisonKey).map(([key, value], index) => {
		const rowClass = index % 2 === 0 ? styles.even : styles.odd;

		return (
			<div key={key} className={`${styles.row} ${rowClass}`}>
				<div
					className={`${styles.column} ${key === 'total_landed_price' ? styles.bold : {}}`}
				>
					{value}
				</div>

				{allLineItems.map((item) => {
					const [lineItem] = Object.values(item);

					const lineItemObj = lineItem.find((childItem) => childItem?.code === key) || {};

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

function ComparisonTable({ allLineItems = [], summary = {}, LOGO_MAPPING = {} }) {
	const { container_size = '', container_type = '', commodity = '' } = summary;

	const newAllLineItems = [...allLineItems];

	newAllLineItems.sort(compareByArrayLength);

	const getCustomNames = (item = {}) => {
		const MAPPING = {
			BAS: `${item.name} Price (${['20', '40'].includes(container_size) ? `${container_size}ft.`
				: container_size} ${startCase(container_type)} ${startCase(commodity)} Container)`,
		};

		return MAPPING[item.code] || item.name;
	};

	const COMPARISON_KEY = {};

	newAllLineItems.forEach((obj) => {
		Object.values(obj).forEach((arr) => {
			arr.forEach((item) => {
				if (item?.code) {
					COMPARISON_KEY[item?.code] = getCustomNames(item) || '';
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
			/>
		</div>
	);
}

export default ComparisonTable;
