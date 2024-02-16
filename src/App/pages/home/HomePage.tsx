import { useNavigate } from 'react-router-dom';
import { Button, Layout } from "antd";
const { Header, Content, Footer } = Layout;

import home from './home.module.scss';
import ferrari from '../../../../public/Ferrari.svg';




export const HomePage = () => {
   const navigate = useNavigate();

   return (
      <Layout className={home.container}>
         <Header className={`${home.header} w100 df jcsb aic`}>
            <div className='w100 df aic'>
               <img
                  src={ferrari}
                  alt=''
                  className={home.logo}
               />
            </div>
            <div className='df gr'>
               <Button
                  className={home.login}
                  onClick={() => navigate('/login')}
               >
                  Sign In
               </Button>
               <Button
                  className={home.registration}
                  onClick={() => navigate('/register')}
                  type='primary'
               >
                  Register
               </Button>
            </div>
         </Header>
         <Content className={`${home.content} df jcc aic`}>
            Пожалуйста, войдите в аккаунт
         </Content>
         <Footer className={home.footer}>
            Ferrari Catalog | &copy; tragedyfiftyseven
         </Footer>
      </Layout>
   )
}