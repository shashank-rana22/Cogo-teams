import { Loader } from '@cogoport/components';
import { useEffect } from 'react';
import { v1 as uuid } from 'uuid';

import useListMargins from '../../../hooks/useListMargins';
import Details from '../Details';
import ListPagination from '../ListPagination';

function Footer({ service = '', margin_type = '', setMarginBreakupData = () => {} }) {
	const {
		data = {}, loading = false, setFilterParams = () => { }, params = {}, setParams = () => {},
	} = useListMargins({
		defaultParams:
            { margin_stats_required: true, page_limit: 5 },
	});
	useEffect(() => {
		setFilterParams((prev) => ({ ...prev, service, margin_type }));
	}, [service, setFilterParams, margin_type]);
	const paginationProps = { params, setParams, data };
	if (loading) return <Loader themeType="primary" />;
	return (
		<div>
			<ListPagination paginationProps={paginationProps} />
			{(data?.list || []).map((item, index) => (
				<Details
					setMarginBreakupData={setMarginBreakupData}
					key={`${`${index}${uuid()}`}`}
					data={item}
				/>
			))}
			<ListPagination paginationProps={paginationProps} />
		</div>
	);
}
export default Footer;
