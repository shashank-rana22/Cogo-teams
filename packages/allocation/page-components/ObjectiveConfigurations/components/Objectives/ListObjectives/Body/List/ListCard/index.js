import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

import ObjectiveDetailsCard from './ObjectiveDetailsCard';
import styles from './styles.module.css';

function ListCard(props) {
	const { listItem, LIST_COLUMN_MAPPING, activeObjectiveId, setActiveObjectiveId } = props;

	const { id } = listItem;

	return (
		<div className={styles.card_container}>
			<div className={styles.list_card}>
				{LIST_COLUMN_MAPPING.map((column) => {
					const { key, flex, accessor } = column;

					return (
						<div
							key={key}
							style={{ flex }}
							className={styles.card_column}
						>
							{accessor(listItem)}
						</div>
					);
				})}
			</div>

			{activeObjectiveId === id && <ObjectiveDetailsCard activeObjectiveId={activeObjectiveId} />}

			<div
				className={styles.view_details}
				role="presentation"
				onClick={() => {
					setActiveObjectiveId(id === activeObjectiveId ? null : id);
				}}
			>
				{activeObjectiveId === id ? (
					<>
						View Less
						<IcMArrowUp style={{ marginLeft: '4px' }} />
					</>
				) : (
					<>
						View Details
						<IcMArrowDown style={{ marginLeft: '4px' }} />
					</>
				)}
			</div>
		</div>
	);
}

export default ListCard;
