function FILTERS_DATA(statsData){
      const{INITIATED='',FINANCE_ACCEPTED='',ON_HOLD='' }=statsData || {};
      console.log(statsData,'statsDatastatsData',);
      
    return [
            {
                label : 'Initiated',
                value : 'INITIATED',
                badge:  INITIATED ,
            },
            {
                label : 'On Hold',
                value : 'ON_HOLD',
                badge:  ON_HOLD||'0' ,
            },
            {
                label : 'Approved',
                value : 'FINANCE_ACCEPTED',
                badge:  FINANCE_ACCEPTED,
            },
            
        ];
    
 } 
export default FILTERS_DATA;
