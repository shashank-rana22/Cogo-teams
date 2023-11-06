import DetailFooter from './DetailFooter';
import MainCard from './MainCard';
import styles from './styles.module.css';

function FclCard({
	detail = {},
	shippingLines = [],
	formProps = {},
	detentionValues = {},
	setDetentionValues = () => {},
	watch = () => {},
}) {
	return (
		<div className={styles.container}>
			<MainCard
				detail={detail}
				shippingLines={shippingLines}
				formProps={formProps}
				watch={watch}
			/>

			<DetailFooter
				detail={detail}
				setDetentionValues={setDetentionValues}
				detentionValues={detentionValues}
			/>
		</div>
	);
}

export default FclCard;
