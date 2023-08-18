import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useGetKRA from '../EditKRA/hooks/useGetKRA';

import FormComponent from './FormComponent';
import Header from './Header';

function CreateKRA() {
	const { data, loading, getKRA } = useGetKRA();

	const router = useRouter();
	const id = router?.query?.kra_id;

	useEffect(() => {
		if (id) {
			getKRA({ kra_id: id });
		}
	}, [getKRA, id]);

	return (
		<div>
			<Header />
			<FormComponent data={data} loading={loading} />
		</div>

	);
}

export default CreateKRA;
