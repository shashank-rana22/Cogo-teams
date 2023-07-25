import Body from './Body';
import LoadingBody from './Body/LoadingBody';
import Footer from './Footer';
import LoadingFooter from './Footer/LoadingFooter';
import Header from './Header';
import LoadingHeader from './Header/LoadingHeader';
import styles from './styles.module.css';

function Card({ item, loading, setShowDetailPage, filters }) {
	const handleOnClick = () => {
		if (loading) {
			return null;
		}
		return setShowDetailPage(item);
	};
	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={handleOnClick}
		>
			<div>
				{loading ? <LoadingHeader /> : <Header data={item} filters={filters} />}
			</div>
			<div>
				{loading ? <LoadingBody /> : <Body data={item} />}

			</div>
			<div>
				{loading ? <LoadingFooter /> : <Footer data={item} />}

			</div>

		</div>
	);
}
export default Card;
