import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ShowMoreTNC(props) {
	const { description } = props;

	if (isEmpty(description)) {
		return (
			<div color="#393f70" size={12}>
				Data not Found
			</div>
		);
	}
	const ONE = 1;
	return (
		<div>
			{description.map((item, index) => (
				<div key={item.id} className={styles.applied_terms}>
					<div className={styles.index}>
						{index + ONE}
						.
					</div>
					{item}
				</div>
			))}
		</div>
	);
}

export default ShowMoreTNC;
