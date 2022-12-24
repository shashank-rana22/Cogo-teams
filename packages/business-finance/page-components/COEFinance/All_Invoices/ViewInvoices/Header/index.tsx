import React from 'react'
import { Button } from '@cogoport/components'
import styles from './styles.module.css'
const Header =()=>{
    
return(
<div>
    <div className={styles.container}>
        <Button size="md" themeType="secondary">Go Back</Button>
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