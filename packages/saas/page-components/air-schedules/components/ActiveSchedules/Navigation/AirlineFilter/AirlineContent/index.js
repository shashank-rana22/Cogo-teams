import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function AirlineContent(props) {
	const { list, events, value } = props;
	const handleChange = (item) => {
		events(item, value);
	};
	return (
		<div className={styles.flex}>
			<ul style={{ padding: '0px 10px 0px 10px' }}>
				{list?.map((item, i) => (
					<div className={styles.flex} key={item.id} style={{ alignItems: 'center', marginBottom: '6px' }}>
						<Checkbox
							checked={item.status}
							onChange={() => handleChange(item)}
							id={`${i}_active_air_sch_filter_dp`}
						/>
						<div className={styles.title}>{item.name}</div>
					</div>
				))}
			</ul>
		</div>
	);
}

export default AirlineContent;
