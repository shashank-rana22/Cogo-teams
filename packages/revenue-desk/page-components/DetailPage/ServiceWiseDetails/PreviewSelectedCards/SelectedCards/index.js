import SingleSelectedCard from './SingleSelectedCard';
import styles from './styles.modules.css';

function SelectedCards({ prefrences }) {
	return (
		<div className={styles.lower_section}>
			{prefrences?.map((Singleitem, index) => (
				<div key={Singleitem}>
					<SingleSelectedCard data={Singleitem?.data} index={index} />
				</div>
			))}
		</div>
	);
}

export default SelectedCards;
