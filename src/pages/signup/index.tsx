
import Head from 'next/head'
import Image from 'next/image'

import {useState,FormEvent, useContext } from 'react'

import { Inter } from '@next/font/google'

import logoImg from '../../../public/logo.svg';
import { Input } from '../../components/ui/Input';

import styles from '../../../styles/home.module.scss'
import { Button } from '../../components/ui/Button';

import { AuthContext } from '@/src/contexts/AuthContext';

import Link from 'next/link';

import { toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export default function Signup() {
  const{signUp} = useContext(AuthContext);


  const [name, setName ] =useState('')
  const [email, setEmail] = useState(' ')
  const [password, setPassowrd ] =useState( '')

  const [loadingl, setLoadingl] =useState(false);

   async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === ' ' || email === '' || password === ''){
      
      toast.error("Preencha todos os campos")
      return;
    }

    setLoadingl(true);

    let data ={
      name,
      email,
      password
    }
    await signUp(data)

    setLoadingl(false);
  }

  return (
    <>
   <Head>
    <title>
      Faça seu cadastro
    </title>

   </Head>

   <div className={styles.containerCenter}>
    <Image src={logoImg} alt= "Logo Sujeito Pizzaria"/>

    <div className={styles.login}>
        <h1> Crie sua conta</h1>

      <form onSubmit={handleSignUp}>

      <Input
         placeholder='Digite seu nome'
         type="text"
         value={name}
         onChange={ (e) => setName(e.target.value)}
        />

        <Input
         placeholder='Digite seu email'
         type="text"
         value={email}
         onChange={ (e) => setEmail(e.target.value)}
        />

        <Input
         placeholder='Crie uma senha'
         type="password"
         value={password}
         onChange={ (e) => setPassowrd(e.target.value)}
        />
             
        <Button
        type="submit"
        loadingl={loadingl}
        >
        
         Cadastrar
        </Button>
      </form>

    <Link className={styles.text}   href='/'>
      Possui uma conta?  Faça o login
    </Link>

      </div>
   </div>
    </>
  )
}
