import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RightSection() {
	return (
		<div className={styles.container}>
			<Header />
			<Body />
			<Footer />
		</div>
	);
}

export default RightSection;
