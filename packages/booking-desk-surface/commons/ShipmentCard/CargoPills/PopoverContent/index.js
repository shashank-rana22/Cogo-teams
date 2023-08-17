import { Pill } from '@cogoport/components';
import { useRef } from 'react';
import { v4 as uuid } from 'uuid';

import getPillsFormat from '../../../../helpers/getPillsFormat';

import styles from './styles.module.css';

function PopoverContent({ list = [] }) {
	const ref = useRef(list?.map(() => uuid()));
	return (
		<div className={styles.container}>
			{list?.map((item, index) => {
				const pills = getPillsFormat(item);
				return (
					<div className={styles.pills_container} key={ref[index]}>
						{pills?.map((pill) => <Pill key={pill}>{pill || ''}</Pill>)}
					</div>
				);
			})}
		</div>
	);
}

export default PopoverContent;
