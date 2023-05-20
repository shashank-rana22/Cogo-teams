import { Pill } from '@cogoport/components';
import { v4 as uuid } from 'uuid';

import getPillsFormat from '../../../../helpers/getPillsFormat';

import styles from './styles.module.css';

function PopoverContent({ list = [] }) {
	return (
		<div className={styles.container}>
			{list?.map((item) => {
				const pills = getPillsFormat(item);
				return (
					<div className={styles.pills_container} key={uuid()}>
						{pills?.map((pill) => <Pill key={pill}>{pill || ''}</Pill>)}
					</div>
				);
			})}
		</div>
	);
}

export default PopoverContent;
