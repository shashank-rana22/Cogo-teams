import useGetListObjectives from '../../../../hooks/useGetListObjectives';

import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function ListObjectives(props) {
	const { ...rest } = props;

	const {
		loading = false,
		data = {},
		refetchListObjectives = () => { },
		params = {},
		setParams = () => { },
		debounceQuery,
	} = useGetListObjectives();

	return (
		<>
			<div className={styles.heading_container}>
				Objectives list
			</div>

			<Header
				{...rest}
				params={params}
				setParams={setParams}
			/>

			<Body
				{...rest}
				data={data}
				loading={loading}
				refetchListObjectives={refetchListObjectives}
				params={params}
				setParams={setParams}
				debounceQuery={debounceQuery}
			/>
		</>
	);
}

export default ListObjectives;
