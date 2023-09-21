import styles from './styles.module.css';

function AddressCard({ addresses = {} }) {
	const { address = '', city = '', state = '', district = '', pincode = '' } = addresses;
	return (

		<div className={styles.address_container}>
			<p>
				{address}
			</p>
			<p>
				{city}
				{' '}
				{state}
				{' '}
				{district}
				{' '}
				{pincode}
			</p>
		</div>

	);
}
export default AddressCard;
