import { cl } from '@cogoport/components';

import useListIGMDeskShipments from '../../hooks/useListIGMDeskShipments';
import Loader from '../Loader';

import List from './List';
import styles from './styles.module.css';

export default function RenderList({ Card = null }) {
	const { loading, data } = useListIGMDeskShipments();

	return (
		<div
			className={cl`${styles.list_container} ${loading ? styles.loading : ''}`}
		>
			{loading ? (
				<Loader />
			) : (
				<List
					data={data}
					Card={Card}
				/>
			)}
		</div>
	);
}
