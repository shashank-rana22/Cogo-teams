import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const LABEL_MAPPING = {
	address    : 'Address',
	city       : 'City',
	country    : 'Country',
	state      : 'State',
	pincode    : 'Pin Code',
	tax_number : 'Tax Number',
};

function ShowAddressList({
	data = [],
}) {
	const details = (data || []).map((address) => {
		const obj = {
			address    : address?.address,
			city       : address?.city,
			country    : address?.country,
			state      : address?.state,
			pincode    : address?.pincode,
			tax_number : address?.tax_number,
		};

		return obj;
	});

	if (isEmpty(details)) {
		return null;
	}

	return (
		<div className={styles.main}>

			{(details).map((poc) => (
				<div key={poc} className={styles.content}>

					<div className={styles.box_info}>

						{Object.keys(poc).map((pocKey) => (
							<div key={pocKey} className={styles.label_value_container}>
								<div className={styles.top}>
									{LABEL_MAPPING[pocKey]}
								</div>

								<div className={styles.bottom}>
									{poc?.[pocKey] }
								</div>
							</div>

						))}

					</div>

				</div>
			))}

		</div>
	);
}

export default ShowAddressList;
