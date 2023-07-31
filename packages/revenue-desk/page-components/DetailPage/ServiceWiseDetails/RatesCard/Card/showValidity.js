import { format } from '@cogoport/utils';

const showValidity = (item) => {
	if (item?.rowData?.is_rate_expired) {
		return <span style={{ color: 'red' }}> (This Rate is Expired)</span>;
	}

	if (item?.rowData?.validity_end) {
		return (
			<span style={{ color: 'red' }}>
				(Valid till:
				{' '}
				{format(item?.rowData?.validity_end, 'dd MMM YYYY')}
				)
			</span>
		);
	}
	return null;
};

export default showValidity;
