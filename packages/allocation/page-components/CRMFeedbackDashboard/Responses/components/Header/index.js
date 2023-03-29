import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { forwardRef } from 'react';

import styles from './styles.module.css';

function Header(props, ref) {
	const router = useRouter();

	const {
		current : {
			organization = '',
		},
	} = ref;

	return (
		<button
			className={styles.back_button}
			onClick={() => router.back()}
		>
			<IcMArrowBack width="32px" height="20px" />
			{startCase(organization)}
		</button>

	);
}

export default forwardRef(Header);
