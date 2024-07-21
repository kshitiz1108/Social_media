import React from 'react'
import SignUpCard from '../components/SignUpCard'
import LogInCard from '../components/LogInCard'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../../atoms/authAtom'

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom)

  return (
    <>
        {authScreenState === 'login' ? <LogInCard/> : <SignUpCard/> }
    </>
  )
}

export default AuthPage