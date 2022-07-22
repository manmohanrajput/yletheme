import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BackToTop from './common/BackToTop';
import { Styles } from './styles/footerOne.js';
import { fetchWebData } from '../apis/api';
import { useClientStore } from '../contextProviders/clientContext';
import { IoIosArrowForward } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { BiEnvelope, BiPhone } from 'react-icons/bi';
import { Observer } from 'mobx-react-lite';
import speedLogo from './../speedlogo.png';

const Footer = () => {
  const clientStore = useClientStore();
  // const [Styles, setStyles] = useState(StyleFun(clientStore.colors))
  const [webConfig, setWebConfig] = useState({});
  const [webDetail, setWebDetail] = useState({});
  const [customTabLink, setCustomTabLink] = useState('');
  const [customTab, setCustomTab] = useState('');
  const [speedLabsBtn, setSpeedLabsBtn] = useState('');

  useEffect(() => {
    fetchWebData(clientStore.webHash)
      .then((data) => {
        setWebDetail(data.detail);
        setWebConfig(data.config);
        if (clientStore.instituteDetails['Custom Tab Name'] !== undefined) {
          setCustomTab(clientStore.instituteDetails['Custom Tab Name']);
          setCustomTabLink(clientStore.instituteDetails['Custom Link']);
        } else if (clientStore.instituteDetails['speedlabs_link'] !== undefined) {
          setSpeedLabsBtn(clientStore.instituteDetails['speedlabs_link']);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [dataStatus, setDataStatus] = useState(false);
  const [toggle, setToggle] = useState(0);
  const [youtube, setYoutube] = useState('');

  useEffect(() => {
    updateData();
  }, [dataStatus]);

  const updateData = () => {
    if (clientStore.instituteDetails['youtube'] !== undefined && !dataStatus) {
      setYoutube(clientStore.instituteDetails['youtube']);
      setDataStatus(true);
    }
    if (!dataStatus) setToggle(toggle + 1);
  };

  return (
    <Observer>
      {() => {
        return (
          <Styles colors={clientStore.colors}>
            {/* Footer Area */}
            <footer className='footer1'>
              <a
                href={'https://wa.me/91' + webDetail.contact1}
                className='whatsapp_float'
                target='_blank'
              >
                {' '}
                <i
                  style={{ color: 'white' }}
                  className='fab fa-whatsapp whatsapp-icon'
                ></i>
              </a>

              <Container>
                <Row>
                  <Col md='6'>
                    <div className='footer-logo-info'>
                      <img
                        src={webDetail.footer_logo}
                        alt=''
                        className='img-fluid'
                      />
                      {webConfig.site_map === 'Y' ? (
                        <p
                          style={{
                            fontSize: '2.2em',
                            fontWeight: '500',
                            color: '#eeeeee',
                          }}
                          className='footer-text'
                        >
                          {webDetail.institute_name}
                        </p>
                      ) : null}
                      <p
                        className='footer-text'
                        dangerouslySetInnerHTML={{
                          __html: webDetail.footer_text,
                        }}
                      />
                      <ul className='list-unstyled'>
                        {webDetail.address1 !== null ? (
                          <li>
                            <FiMapPin /> {webDetail.address1}
                          </li>
                        ) : null}
                        {webDetail.address2 !== null ? (
                          <li>
                            <FiMapPin /> {webDetail.address2}
                          </li>
                        ) : null}
                        {webDetail.email1 !== null ? (
                          <li>
                            <BiEnvelope /> {webDetail.email1}
                          </li>
                        ) : null}
                        {webDetail.email2 !== null ? (
                          <li>
                            <BiEnvelope /> {webDetail.email2}
                          </li>
                        ) : null}
                        {webDetail.contact1 !== null ? (
                          <li>
                            <BiPhone /> {webDetail.contact1}
                          </li>
                        ) : null}
                        {webDetail.contact2 !== null ? (
                          <li>
                            <BiPhone /> {webDetail.contact2}
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </Col>
                  <Col md='6'>
                    <div className='f-links'>
                      <h5>Useful Links</h5>
                      <Row className='useful-links'>
                        <Col>
                          <ul className='list-unstyled'>
                            {webConfig.menu && webConfig.menu[9] == 'Y' ? (
                              <li>
                                <Link
                                  to={process.env.PUBLIC_URL + '/blog-grid'}
                                >
                                  <IoIosArrowForward />
                                  Blogs
                                </Link>
                              </li>
                            ) : null}
                            {webConfig.menu && webConfig.menu[6] == 'Y' ? (
                              <li>
                                <Link to={process.env.PUBLIC_URL + '/career'}>
                                  <IoIosArrowForward />
                                  Careers
                                </Link>
                              </li>
                            ) : null}
                            {webConfig.menu && webConfig.menu[8] == 'Y' ? (
                              <li>
                                <Link
                                  to={process.env.PUBLIC_URL + '/franchise'}
                                >
                                  <IoIosArrowForward />
                                  Franchise
                                </Link>
                              </li>
                            ) : null}
                            <li>
                              <Link
                                to={process.env.PUBLIC_URL + '/achievements'}
                              >
                                <IoIosArrowForward />
                                Achievements
                              </Link>
                            </li>
                            {webConfig.menu && webConfig.menu[3] == 'Y' ? (<li>
                              <Link
                                to={process.env.PUBLIC_URL + '/packages'}
                              >
                                <IoIosArrowForward />
                                {clientStore.webHash === "ae7e2b3c76265700ab873612434b99c7" ? (<>Fee Structure</>):(<>Packages</>)}
                              </Link>
                            </li>):(null)}
                            <li>
                                <Link to={process.env.PUBLIC_URL + '/refund'}>
                                  <IoIosArrowForward />
                                  Refund Policy
                                </Link>
                              </li>

                              <li>
                                <Link to={process.env.PUBLIC_URL + '/term'}>
                                  <IoIosArrowForward />
                                  Terms & Condition
                                </Link>
                              </li>
                          </ul>
                        </Col>
                        <Col>
                          <ul className='list-unstyled'>
                            <li>
                              <Link to={process.env.PUBLIC_URL + '/faq'}>
                                <IoIosArrowForward />
                                FAQs
                              </Link>
                            </li>
                            {clientStore.webHash==="c58058e5ba190e08e89ab20864c6d05d"  || clientStore.webHash==="3a23b580b4fe9096f8de084163cc806e"  ? (<></>):(<li>
                              <Link to={process.env.PUBLIC_URL + '/admission'}>
                                <IoIosArrowForward />
                                Admission
                              </Link>
                            </li>)}
                            {webConfig.cms_batch === 'true' ? (
                              <li>
                                <Link to={process.env.PUBLIC_URL + '/batches'}>
                                  <IoIosArrowForward />
                                  Batches
                                </Link>
                              </li>
                            ) : null}
                            {webConfig.cms_alerts === 'true' ? (
                              <li>
                                <Link to={process.env.PUBLIC_URL + '/alerts'}>
                                  <IoIosArrowForward />
                                  Alerts
                                </Link>
                              </li>
                            ) : null}
                            {webConfig.menu && webConfig.menu[11] == 'Y' ? (
                              <li>
                                <Link to={process.env.PUBLIC_URL + '/contact'}>
                                  <IoIosArrowForward />
                                  Contact Us
                                </Link>
                              </li>
                            ) : null}
                            <li>
                                <Link to={process.env.PUBLIC_URL + '/privacy'}>
                                  <IoIosArrowForward />
                                  Privacy Policy
                                </Link>
                              </li>
                              <li>
                             
                            </li>
                              <li>
                                {customTab !== '' ? (
                                    <div className='apply-btn'>
                                      <a href={customTabLink} target='_blank'>
                                      <IoIosArrowForward />
                                        {customTab}
                                      </a>
                                    </div>
                                  ) : null}
                                  {speedLabsBtn !== '' && customTab === '' ? (
                                    <div className='apply-btn'>
                                      <a href={speedLabsBtn} target='_blank'>
                                      <IoIosArrowForward />
                                        Speedlabs
                                      </a>
                                    </div>
                                  ) : null}
                              </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </footer>

            {/* Copyright Area */}
            <section className='copyright-area'>
              <Container>
                <Row>
                  <Col md='6'>
                    <div className='copy-text'>
                      <p>
                        Copyright &copy; 2021{' '}
                        <Link to={process.env.PUBLIC_URL + '/'}>
                          {webDetail.institute_name}
                        </Link>{' '}
                        All rights reserved
                      </p>
                    </div>
                  </Col>
                  <Col md='6' className='text-right'>
                    <ul className='social list-unstyled list-inline'>
                      {webConfig.social && webConfig.social[0] == 'Y' ? (
                        <li className='list-inline-item'>
                          <a target='_blank' href={webDetail.facebook}>
                            <i className='fab fa-facebook-f'></i>
                          </a>
                        </li>
                      ) : null}
                      {webConfig.social && webConfig.social[1] == 'Y' ? (
                        <li className='list-inline-item'>
                          <a target='_blank' href={webDetail.twitter}>
                            <i className='fab fa-twitter'></i>
                          </a>
                        </li>
                      ) : null}
                      {webConfig.social && webConfig.social[2] == 'Y' ? (
                        <li className='list-inline-item'>
                          <a target='_blank' href={webDetail.linkedin}>
                            <i className='fab fa-linkedin-in'></i>
                          </a>
                        </li>
                      ) : null}
                      {webConfig.social && webConfig.social[3] == 'Y' ? (
                        <li className='list-inline-item'>
                          <a target='_blank' href={webDetail.instagram}>
                            <i className='fab fa-instagram'></i>
                          </a>
                        </li>
                      ) : null}
                      {webConfig.social && webConfig.social[4] == 'Y' ? (
                        <li className='list-inline-item'>
                          <a target='_blank' href={youtube}>
                            <i className='fab fa-youtube'></i>
                          </a>
                        </li>
                      ) : null}
                      {webConfig.social && webConfig.social[5] == 'Y' ? (
                        <li className='list-inline-item'>
                          <a target='_blank' href={webDetail.app_url}>
                            <i className='fab fa-google-play'></i>
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </Col>
                </Row>
              </Container>

              {/* Back To Top */}
              {/* <BackToTop /> */}
            </section>
          </Styles>
        );
      }}
    </Observer>
  );
};

export default Footer;
