import React from 'react';
import styled from './styles.module.css';



function RenderStatus ({ item={}, field={} })  {
    
	return (
		<div>
       		 {(item?.status==='FINANCE_ACCEPTED') &&
				<div className={styled.StatusFinanceAccepted}>Finance Accepted</div>
			}
			 {(item?.status==='INITIATED') &&
				<div className={styled.StatusInitiated}>Initiated</div>
			}
			{(item?.status==='ACCEPTED') &&
				<div className={styled.StatusAccepted}>Accepted</div>
			}
			 {(item?.status==='FINANCE_REJECTED') &&
				<div className={styled.StatusFinanceRejected}>Finance Rejected</div>
			}
			 {(item?.status==='POSTED') &&
				<div className={styled.StatusPosted}>Posted</div>
			}
			{(item?.status==='VOID') &&
				<div className={styled.StatusVoid}>Void</div>
			}
			{(item?.status==='COE_REJECTED') &&
				<div className={styled.StatusCOERejected}>COE Rejected</div>
			}

		</div>
	);
};

export default RenderStatus;




	

