import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function LeadOrgCard({ eachItem = {} }) {
	return (
		<div className={styles.each_container}>
			<Header eachItem={eachItem} />
			<Body eachItem={eachItem} />
		</div>
	);
}
export default LeadOrgCard;
