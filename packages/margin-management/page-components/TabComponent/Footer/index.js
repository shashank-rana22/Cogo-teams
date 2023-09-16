import { Loader } from '@cogoport/components';
import { useEffect } from 'react';
import { v1 as uuid } from 'uuid';

import useListMargins from '../../../hooks/useListMargins';
import Details from '../Details';
import ListPagination from '../ListPagination';

function Footer({
	service = '', margin_type = '', setMarginBreakupData = () => {},
	showContainerDetails = true,
}) {
	const {
		data = {}, loading = false, setFilterParams = () => { }, filterParams = {},
	} = useListMargins({
		defaultParams:
            { margin_stats_required: true, page_limit: 5 },
	});
	useEffect(() => {
		setFilterParams({ margin_type: 'demand', service: '', status: 'active' });
	}, [setFilterParams]);
	useEffect(() => {
		setFilterParams((prev) => ({ ...prev, service, margin_type }));
	}, [service, setFilterParams, margin_type]);
	const paginationProps = { filterParams, setFilterParams, data };
	if (loading) return <Loader themeType="primary" />;
	return (
		<div>
			<ListPagination paginationProps={paginationProps} />
			{(data?.list || []).map((item, index) => (
				<Details
					showContainerDetails={showContainerDetails}
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
