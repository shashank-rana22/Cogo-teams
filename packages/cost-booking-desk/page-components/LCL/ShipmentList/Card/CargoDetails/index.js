import { Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { renderValue } from './renderCargoValue';
import styles from './styles.module.css';

const labels = ['commodity', 'volume', 'inco_term', 'weight'];

const renderCargoPills = (cargo_detail) => (
	labels.map((label) => (cargo_detail?.[label]
		? (
			<Pill size="sm" key={label}>
				{renderValue(label, cargo_detail[label])}
			</Pill>
		)
		: null))
);

export default function CargoDetails({ item = {} }) {
	return (
		<div className={styles.cargo_details_container}>
			{!isEmpty(item) ? renderCargoPills(item) : null}
		</div>
	);
}
