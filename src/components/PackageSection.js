import React, { useEffect, useState } from 'react';
// import Datas from '../../data/shop/product.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from './styles/packageSection';
import { useClientStore } from '../contextProviders/clientContext';
import { fetchPackageDetails } from '../apis/api';
// import { nanoid } from 'nanoid';
// import { moment } from "moment"
import { buildPackage } from '../utility';
import { getColorObj } from './common/element/elements';
import { updateColorObj } from '../utility';
import ReactGA from "react-ga";
const PackageSection = () => {
  const clientStore = useClientStore();
  const [packages, setPackages] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  const [defImage, setDefImage] = useState(false);
  useEffect(() => {
    getPackageData();
  }, []);

  const getPackageData = async () => {
    const res = await fetchPackageDetails(clientStore.webHash, 3);
    if (res.status === 'success') {
      let arr = buildPackage(res.response);
      setPackages(arr);
      setDataStatus(true);
    }
  };
  // const [Styles, setStyles] = useState(StyleFun(clientStore.colors))
  const toggleProductBox=()=>{
    ReactGA.event({
      category: 'Product Box',
      action: 'Product Box clicked!',
      label: 'After clicking on Product Box,perticular items information will be display!'
    })
  }
  const toggleViewProducItems=()=>{
    ReactGA.event({
      category: 'View all Packages Button',
      action: 'View all Packages clicked!',
      label: 'After clicking on View all Packages,all packages information will be display!'
    })
  }
  return dataStatus ? (
    <Styles colors={clientStore.colors}>
      {/* Main Wrapper */}
      <div className='main-wrapper product-page'>
        {/* Products */}
        <section className='product-area'>
          <Container>
            <Row>
              <Col md='12'>
                <div className='sec-title text-center'>
                  <h4>
                    We Provide Best Quality Packages. Find the Right One That
                    Fits You.
                  </h4>
                </div>
              </Col>
              <Col lg='11' md='9' sm='8' style={{ margin: 'auto' }}>
                <Row>
                  {packages.map((data, i) => (
                    <Col lg='4' md='6' key={i} style={{ margin: 'auto' }}>
                      <div className='product-box' onClick={toggleProductBox(false)}>
                        <div className='product-img'>
                          {/* <img src={process.env.PUBLIC_URL + `/assets/images/${data.productImg}`} alt="" className="img-fluid" /> */}
                          <img
                            src={data.productImg && data.productImg.length >0 ? (data.productImg):(defImage)}
                            alt='package-section-img???'
                            className='img-fluid'
                          />
                          {/* <span>{data.discount}</span> */}
                          <div className='layer-box'></div>
                          {/* <Link className="add_cart" to={process.env.PUBLIC_URL + data.productUrl}>Add To Cart</Link> */}
                          <Link
                            className='item_view'
                            to={process.env.PUBLIC_URL + data.productUrl}
                          >
                            View Item
                          </Link>
                        </div>
                        <div className='product-content text-center'>
                          <div className='pro-title'>
                            <h5>
                              <Link
                                to={process.env.PUBLIC_URL + data.productUrl}
                              >
                                {data.productTitle}
                              </Link>
                            </h5>
                          </div>

                          <div className='pro-price'>
                            <p> Price : &#8377; {data.price}</p>
                          </div>
                          <div>
                            <p>{data.courseDuration}</p>
                          </div>
                          <div>
                            {/* <button style={{marginTop:'4px',marginBottom:'3px',border:'none', width:'120px',height:'30px',textDecoration:'none'}} ><a  target="_blank" href='http://35.244.8.93:4001/login/780169556366cd2f59c47f58e9158b9e' style={{color:'#e4573a'}} >Apply</a></button> */}
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col md='12' className='text-center'>
                <div className='viewall-btn'>
                  <Link to={process.env.PUBLIC_URL + '/packages'} onClick={toggleViewProducItems(false)}>
                    View All Packages
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Styles>
  ) : null;
};
export default PackageSection;
