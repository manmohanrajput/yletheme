import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from './styles/payonline.js';
import { useClientStore } from '../../contextProviders/clientContext';
import { Observer } from 'mobx-react-lite';
import RazorPayButton from '../../components/RazorPayButton.js';
import { fetchPayment, fetchQrcode } from '../../apis/api.js';



function Pay({id}) {
  const clientStore = useClientStore();
  const [amount, setAmount] = useState(0);
  const [keyId, setKeyId] = useState('');
  const [secret, setSecret] = useState('');
  const [bill, setBill] = useState({
    orderId: '',
    paymentId: '',
    paymentStatus: '',
  });
  const [isSuccess, setIsSuccess] = useState();
  const [isComplete, setIsComplete] = useState();
  const [isPayment, setIsPayment] = useState(false);
  const [ qrcode, setQrcode] = useState('')
  useEffect(() => {
    getPaymentDetail();
  }, []);

  useEffect(() => {
    getQrCode();
  },[])


  const getPaymentDetail = async () => {
    const res = await fetchPayment(clientStore.webHash);
    if (res.status === 'success') {
      setKeyId(res.response.payment_gateway_access_key);
      setSecret(res.response.payment_gateway_access_code);

      //comment out this hardcoded credentials
      // setKeyId('rzp_test_TbHhelw0PIhB8U');
      // setSecret('Zr7SxsJrB197ERMDSMkrxima');
    }
  };

  const getQrCode = async () => {
    const res = await fetchQrcode(clientStore.webHash)
    
      if(res.length > 0)  
      {
        setQrcode(res[0].qr_code_img)
      }
      console.log("Url is :",qrcode)
    
  };



  return (
    <Observer>
      {() => {
        return (
          <Styles colors={clientStore.colors}>
            {/* Main Wrapper */}
            <div className='main-wrapper login-page'>
              {/* Login Area */}
              <h1 style={{display:'flex',margin:'20px auto',justifyContent:'center'}}>Pay Online</h1>
              <section className='login-area'>
                <Container>
                {keyId ? (
                  <div>
                  {isPayment ? (
                    isComplete ? (
                      <div className='login-box'>
                        <div className='login-title text-center'>
                          {isSuccess ? (
                            <>
                              <h3 style={{ color: 'green' }}>
                                Payment Successful!
                              </h3>
                              <p>Order id : {bill.orderId}</p>
                              <p>Payment Id: {bill.paymentId}</p>
                              <p>Payment Status: {bill.paymentStatus}</p>
                              <p>Amount: ₹{amount}</p>
                            </>
                              ) : (
                                <>
                                  <h3 style={{ color: 'green' }}>
                                        Payment Successfull , not verified!
                                  </h3>
                                    <p>Order id : {bill.orderId}</p>
                                    <p>Payment Id: {bill.paymentId}</p>
                                    <p>Payment Status : {bill.paymentStatus}</p>
                                    <p>Amount: ₹{amount}</p>
                                </>
                              )}
                          </div>
                        </div>
                    ) : (
                      <div className='login-box'>
                        <div className='login-title text-center'>
                          <h3 style={{ color: 'red' }}>Payment Failed!</h3>
                        </div>
                      </div>
                    )
                  ) : null}

                  <Row>
                    <Col md='12'>
                      {!isPayment && (
                        <div className='login-box'>
                          <div className='login-title text-center'>
                            <h3>Payment</h3>
                          </div>
                          <form
                            id='form_login'
                            className='form'
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <p className='form-control'>
                              <label htmlFor='login_user'>Amount</label>
                              <input
                                type='text'
                                placeholder='INR (min: ₹ 1)'
                                id='login_user'
                                onChange={(e) => setAmount(e.target.value)}
                              />
                              <span className='login_input-msg'></span>
                            </p>

                            {/* <button>Pay</button> */}
                            <RazorPayButton
                              amount={amount}
                              keyId={keyId}
                              setBill={setBill}
                              setIsSuccess={setIsSuccess}
                              setIsComplete={setIsComplete}
                              setIsPayment={setIsPayment}
                              secret={secret}
                            />
                          </form>
                        </div>
                      )}
                      
                    </Col>
                  </Row>
                  </div>):(null)}
                  <div>
                  {qrcode ? (<Row>
                                <Col md="12">
                                
                                <div style={{width:'350px',height:'450px',padding:'50px',boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.1)',margin:'20px auto'}}>
                  <img style={{width:'250px',height:'auto'}} src={qrcode} alt=""/>
                  <h5 style={{marginTop:'20px'}}>
                      For Making the payment scan the QR Code
                  </h5>
              </div>
                                
                                </Col>
                            </Row>):(null)}
                    </div>
                  
                </Container>


                
              </section>

              {/* Footer 2 */}
              {/* <Footer /> */}
            </div>
          </Styles>
        );
      }}
    </Observer>
  );
}

export default Pay;
