import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import SERVICE_ICON_MAPPING from '../../constants/serviceIcon';

import styles from './styles.module.css';

function RenderPort({ name }) {
	const spiltedName = name.split(',');
	const portName = spiltedName[GLOBAL_CONSTANTS.zeroth_index];
	let restName = '';

	spiltedName.forEach((ele, i) => {
		if (i !== GLOBAL_CONSTANTS.zeroth_index) {
			restName += `${ele},`;
		}
	});
	return (
		<div>
			<span>{portName}</span>
			<span>{restName}</span>
		</div>
	);
}

function Header({ data = {} }) {
	const { back } = useRouter();
	return (
		<div className={cl`${styles.container} ${styles.flex_box}`}>
			<div className={styles.back_container}>
				<IcMArrowBack width={20} height={20} onClick={back} />
			</div>

			<div className={styles.flex_box}>
				<div>
					<span>{SERVICE_ICON_MAPPING[data?.type]}</span>
					<span>{startCase(data?.type)}</span>
				</div>

				<div>
					<RenderPort name={data?.originName} />
					<IcMPortArrow />
					<RenderPort name={data?.destinationName} />
				</div>
			</div>

		</div>
	);
}

export default Header;
