import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function LeadOrgCard({
	eachItem = {},
	openLeadOrgModal = () => {},
	handlePlaceCall = () => {},
}) {
	return (
		<div className={styles.each_container}>
			<Header eachItem={eachItem} />
			<Body eachItem={eachItem} handlePlaceCall={handlePlaceCall} />
			<Footer eachItem={eachItem} openLeadOrgModal={openLeadOrgModal} />
		</div>
	);
}
export default LeadOrgCard;
