import { Loader } from '@cogoport/components';

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
		defaultFilters: { margin_type, service, status: 'active' },
	});
	const paginationProps = { filterParams, setFilterParams, data };
	if (loading) return <Loader themeType="primary" />;
	return (
		<div>
			<ListPagination paginationProps={paginationProps} />
			{(data?.list || []).map((item) => (
				<Details
					showContainerDetails={showContainerDetails}
					setMarginBreakupData={setMarginBreakupData}
					key={item?.id}
					data={item}
				/>
			))}
			<ListPagination paginationProps={paginationProps} />
		</div>
	);
}
export default Footer;
