import getDetails from './getDetails';
import {startCase, format, isEmpty } from '@cogoport/utils'


const getFormattedSupplierData =  (bookingItem , index, source) => {
    
    const {
        shipping_line,
        supplier_name,
        buy_rate,
        sailing_date,
        is_reverted_rate,
        is_rate_expired,
    } = getDetails({
        bookingItem,
        idx: index,
    });

    const columns = [
        { label: 'Shipping Line', value: shipping_line },
        { label: 'Supplier Name', value: supplier_name },
        { label: 'Buy Rate', value: buy_rate },
        { label: 'Source of Rate', value: startCase(source) },
        {
            label: 'Sailing Date',
            value: !isEmpty(sailing_date)
                ? format(sailing_date, 'dd MMM yyyy')
                : null,
        },
    ];

    return{
        is_rate_expired,
        is_reverted_rate,
        columns
    }

}

export default getFormattedSupplierData;