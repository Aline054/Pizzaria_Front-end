
import { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

import {FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loadingl?: boolean,
    children: ReactNode,
}

export function Button({loadingl,children, ...rest}: ButtonProps){
    return(
        <button 
        className={styles.button}
        disabled={loadingl}
        {...rest}
        >

            { loadingl ? (
                <FaSpinner color='#FFF' size={16} /> 
            ):(
            <a className={styles.buttonText}>
            {children}
            </a>

            )}

           
        </button>
    )
}