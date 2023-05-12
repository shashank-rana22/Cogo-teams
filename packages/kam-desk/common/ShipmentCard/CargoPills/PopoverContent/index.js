import { Pill } from '@cogoport/components';

import getPillsFormat from '../../../../helpers/getPillsFormat';

import styles from './styles.module.css';

function PopoverContent({ list = [] }) {
	return (
		<div className={styles.container}>
			{list?.map((item) => {
				const pills = getPillsFormat(item);
				return (
					<div className={styles.pills_container}>
						{pills.map((pill) => <Pill key={pill}>{pill}</Pill>)}
					</div>
				);
			})}
		</div>
	);
}

export default PopoverContent;
