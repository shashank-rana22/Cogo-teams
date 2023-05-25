import styles from './styles.module.css';

function TitleCard({ item = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.display_card}>
				<div className={styles.bl_number}>
					BL Number:&nbsp;
					<b>
						{item?.bl_number}
					</b>
				</div>
			</div>

		</div>
	);
}

export default TitleCard;
