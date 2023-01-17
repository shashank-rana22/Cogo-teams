  function FILTERS_DATA(statsData){
      const{INITIATED='',FINANCE_ACCEPTED }=statsData || {};
    return [
            {
                label : 'Initiated',
                value : 'INITIATED',
                badge:  INITIATED ,
            },
            {
                label : 'On Hold',
                value : 'ON_HOLD',
            },
            {
                label : 'Approved',
                value : 'FINANCE_ACCEPTED',
                badge:  FINANCE_ACCEPTED,
            },
            
        ];
    
 } 
export default FILTERS_DATA;
// export const FILTERS_DAY_DATA = [
//     {
//         label : 'Last 7 Days',
//         value : 'lastSevenDays',
//     },
//     {
//         label : 'All',
//         value : 'all',
//     },
//     {
//         label : 'Today',
//         value : 'today',
//     },
//     {
//         label : 'Next 3 Days',
//         value : 'nextThreeDays',
//     },
// ];
export const FILTERS_URGENT_DATA = [
    {
        label : 'All',
        value : 'all',
    },
    {
        label : 'Urgent Invoices',
        value : 'Urgency_tag',
    },
];