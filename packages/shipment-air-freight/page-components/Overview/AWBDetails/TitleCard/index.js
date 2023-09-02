import styles from './styles.module.css';

function TitleCard({ item = {} }) {
	const { bl_document_type = '', bl_number = '' } = item || {};
	return (
		<div className={styles.container}>
			<div className={styles.display_card}>
				<div className={styles.bl_number}>
					{`${bl_document_type === 'draft_airway_bill' ? 'MAWB' : 'HAWB'} Number: `}
					<b>{bl_number}</b>
				</div>
			</div>

		</div>
	);
}

export default TitleCard;
