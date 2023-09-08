import { cl } from '@cogoport/components';

import getValue from '../../../../../commons/List/RenderListItem/ListItem/getValue';
import CONSTANTS from '../../../../../constants/constants';

import styles from './styles.module.css';

function CargoListItem({
	fields = [],
	item = {},
	functions = {},
}) {
	return (
		<div className={styles.cargo_list_container}>
			<div
				className={styles.row}
			>
				{fields.map((field) => {
					const itemStyle = field.styles || {};
					return (
						<div
							className={cl`${styles.col} ${field.className}`}
							style={{
								'--span': (field.span || CONSTANTS.DEFAULT_SPAN),
								...itemStyle,
							}}
							key={field.key}
						>
							<div>
								{field.render ? field.render(item) : getValue({
									itemData   : item,
									itemField  : field,
									functions,
									emptyState : '-',
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default CargoListItem;