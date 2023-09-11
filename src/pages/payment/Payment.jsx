import React, { useEffect } from 'react'
import logo from '../../assets/payment.png'
import axios from 'axios';

export default function Payment() {
  // useEffect(() => {
  //   // Haz una solicitud GET a la API con autorización
  //   axios.get('https://paytest.megasoft.com.ve/payment/action/paymentgatewayuniversal-prereg?cod_afiliacion=8082023&factura=500113&monto=365.77', {
  //     headers: {
  //       Authorization: 'Basic GVsb3RlbmdvOkNhcmFjYXMxLg==',
  //     },
  //   })
  //     .then((response) => {
  //       // Si la solicitud tuvo éxito, actualiza los productos
  //       console.log('RESPUESTA', response)
  //     })
  //     .catch((error) => {
  //       // Si la solicitud falló, muestra un error
  //       console.log(error);
  //     });
  // }, []);
  return (
    <div className='w-screen h-screen bg-gray'>

      <div className='w-full h-1/2 lg:h-[60%] bg-primary flex justify-center items-center p-10' >

      <div className='w-4/5 h-auto sm:w-[50%] lg:w-[30%]' >

      <img src={logo} alt="logo"  className='w-full h-auto object-fit: contain'/>
      
      </div>
      
      </div>

      <div className='w-full flex flex-col items-center gap-10'>

        <h1 className='font-bold text-xl xs:text-xl md:text-3xl lg:text-7xl text-primary mt-14'>
         GRACIAS POR TU COMPRA
        </h1>

        <div className='lg:w-[40%] w-[80%]'>
          <p className='text-sm md:text-md lg:text-xl text-black text-center'>
          Gracias por adquirir nuestros productos.
          Esperamos que tu experiencia con nosotros sea extraordinaria.
          Lo más importante para nosotros es tu satisfacción.
          </p>
        </div>

      </div>
      
      
    </div>
  )
}
