import styles from './styles.module.css';

function AddressCard({ addresses = {} }) {
	const { address, city, state, district, pincode } = addresses;
	return (
		<div className={styles.address_container}>
			<div>
				<p>
					<span>
						{address}
					</span>
				</p>
				<p>
					<span>
						{ city && city}
						{' '}
						{state && state}
						{' '}
						{district && district }
						{' '}
						{pincode && pincode}
					</span>
				</p>

			</div>

		</div>
	);
}
export default AddressCard;
