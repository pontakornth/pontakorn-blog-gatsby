import React from 'react'
import styles from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby' 
import { useState } from 'react'

const Navbar = (props) => {
	/*
	Props should contains navbar items { name: string, link: string }
	 */
	const items = props.items || []
	const [active, setActive] = useState(false);
	const handleClickNavbar = () => {
		setActive(_ => true)
		console.log("This")
	}
	const handleClickOverlay = () => {
		setActive(false)
	}
	return (
		<div className={styles.navbar}>
			<button onClick={handleClickNavbar} className={styles.navbarMenu}>
				<FontAwesomeIcon icon={faBars} />
			</button>
			<ul className={[styles.navbarItems, active && styles.active].join(' ')}>
			{items.map((item, index) =>
			 <li className={styles.navbarItem} key={index}>
				 <Link to={item.link}>{item.name}</Link>
			 </li>
			 )}
			</ul>
			<div onClick={handleClickOverlay} className={[styles.overlay, active && styles.active].join(' ')}>
			</div>
		</div>
	)
}

export default Navbar