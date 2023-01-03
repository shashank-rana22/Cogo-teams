import React from 'react'
import { Button } from '@cogoport/components'
import {useRouter} from '@cogoport/next'
import styles from './styles.module.css'
const Header =()=>{
    const Router = useRouter();
return(
<div>
    <div className={styles.container}>
        <Button size="md" themeType="secondary" onClick={()=>Router.push('/business-finance/coe-finance/[active_tab]','/business-finance/coe-finance/all_invoices')}>Go Back</Button>
        <div className={styles.subContainer}>
            <Button size="md" style={{marginRight:'8px'}} disabled>Approve</Button>
            <Button size="md" style={{marginRight:'8px'}} disabled>Approve & Hold</Button>
            <Button size="md" style={{marginRight:'8px' ,background: '#ED3726'}}>Reject</Button>
        </div>
    </div>
    <div className={styles.hr}/>
</div>

)
}
export default Header