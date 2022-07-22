import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import StickyMenu from './common/StickyMenu';
import MobileMenu from './common/MobileMenu';
import { Styles } from './styles/header.js';
import { useClientStore } from '../contextProviders/clientContext';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { fetchDynamicButton } from '../apis/api';
import { fetchInstituteDetails, fetchWebData, fetchWebHash } from '../apis/api';
import ReactGA from "react-ga";
const Header = () => {
  const clientStore = useClientStore();
  const location = useLocation();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dataStatus, setDataStatus] = useState(false);
  const [toggle, setToggle] = useState(0);
  const [logo, setLogo] = useState('');
  const [dynamicButton, setDynamicButton] = useState({});
  const [customTabLink, setCustomTabLink] = useState('');
  const [customTab, setCustomTab] = useState('');
  const [speedLabsBtn, setSpeedLabsBtn] = useState('');
  const [webStatus, setWebStatus] = useState(false);
  const [domain, setDomain] = useState('');
  const [webConfig, setWebConfig] = useState({});
  // const [webDetail, setWebDetail] = useState({});
  const menu = clientStore.webConfig.menu;
  const toggleCall=()=>{
    ReactGA.event({
      category: 'Calling section',
      action: 'Calling Section clicked!',
      label: 'After clicking on Calling,user will connect to perticular coaching institute!'
    })
  }
  const toggleMail=()=>{
    ReactGA.event({
      category: 'Mail section',
      action: 'Mail Section clicked!',
      label: 'After clicking on mail section,user will connect to perticular coaching institute via email!'
    })
  }
  
  const toggleHome=()=>{
    ReactGA.event({
      category: 'Home Button',
      action: 'Home Button clicked!',
      label: 'After clicking on Home Button,user will connect to Home page!'

    })
  }

  const toggleAbout=()=>{
    ReactGA.event({
      category: 'About Button',
      action: 'About Button clicked!',
      label: 'After clicking on About Button,user will connect to About page!'

    })
  }
  const toggleCourses=()=>{
    ReactGA.event({
      category: 'Courses Button',
      action: 'Courses Button clicked!',
      label: 'After clicking on Courses Button,user will connect to Courses page!'

    })
  }
  const toggleGallery=()=>{
    ReactGA.event({
      category: 'Gallery Button',
      action: 'Gallery Button clicked!',
      label: 'After clicking on Gallery Button,user will connect to Gallery page!'

    })
  }
  const togglePackages=()=>{
    ReactGA.event({
      category: 'Packages Button',
      action: 'Packages Button clicked!',
      label: 'After clicking on Packages Button,user will connect to Packages page!'

    })
  }
  const togglePayOnline=()=>{
    ReactGA.event({
      category: 'PayOnline Button',
      action: 'PayOnline Button clicked!',
      label: 'After clicking on PayOnline Button,user will connect to PayOnline page!'

    })
  }
  
  const toggleOnlineTest=()=>{
    ReactGA.event({
      category: 'OnlineTest Button',
      action: 'OnlineTest Button clicked!',
      label: 'After clicking on OnlineTest Button,user will connect to OnlineTest page!'

    })
  }
  const toggleSpeedLabs=()=>{
    ReactGA.event({
      category: 'Speedlabs Custom button',
      action: 'Speedlabs button clicked!',
      label: 'After clicking on Speedlabs button SpeedLabs login page will render!'
    })
  }
  useEffect(() => {
    updateData();
  }, [phone, toggle, dataStatus]);

  useEffect(() => {
    getDynamicButton();
  }, []);

  const updateData = () => {
    if (clientStore.instituteDetails['About Us'] !== undefined && !dataStatus) {
      setPhone(clientStore.instituteDetails.Contact1.slice(0, 10));
      setEmail(clientStore.instituteDetails.Email1);
      setAddress(clientStore.instituteDetails.Address1);
      if (clientStore.instituteDetails['Custom Tab Name'] !== undefined) {
        setCustomTab(clientStore.instituteDetails['Custom Tab Name']);
        setCustomTabLink(clientStore.instituteDetails['Custom Link']);
      } else if (clientStore.instituteDetails['speedlabs_link'] !== undefined) {
        setSpeedLabsBtn(clientStore.instituteDetails['speedlabs_link']);
      } 
      // setCustomTab(clientStore.instituteDetails["Custom Tab Name"])
      // setCustomTabLink(clientStore.instituteDetails["Custom Link"])
      setLogo(clientStore.logo);
      setDataStatus(true);
    }
    if (!dataStatus) setToggle(toggle + 1);
  };

  // const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

  const getDynamicButton = async () => {
    const res = await fetchDynamicButton(clientStore.webHash);
    // const hash = "56609cdc79b2838b15c2950d5dbf654b"
    // const res = await fetchDynamicButton(hash);
    let obj = {
      tab: res.tab_name,
      arr: res.response,
      status: res.status,
    };
    setDynamicButton(obj);
  };
  if (location.pathname !== '/') return null;
  else
    return (
      <Styles colors={clientStore.colors}>
        {/* Topbar */}
        {address !== null ? (
          <section className='top-bar'>
            <Container>
              <Row>
                <Col lg='6' md='5'>
                  <div className='bar-left'>
                    <ul className='list-unstyled list-inline'>
                      {address && address.length > 0 ? (<li className='list-inline-item'>
                        <i className='las la-map-marker'></i>
                        {address}
                      </li>):(null)}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        ) : null}

        {/* Logo Area */}
        <section className='logo-area'>
          <Container>
            <Row>
              <Col md='3'>
                <div className='logo'>
                  <Link to={process.env.PUBLIC_URL + '/'}>
                    <img src={logo} alt='' width='auto' height='auto'  className='logo-img'/>
                  </Link>
                </div>
              </Col>
              <Col md='9' style={{ display: 'flex' }}>
                <div
                  className='logo-contact-box d-flex justify-content-end'
                  style={{ margin: 'auto' }}
                >
                  {phone !== '' ? (
                    <div className='emcontact-box d-flex'>
                      <div className='box-icon'>
                        <i className='flaticon-phone-call'></i>
                      </div>
                      <div className='box-content'>
                        <p>Call Us Now</p>
                        <a href={`tel:${phone}`} style={{ color: 'inherit' }} onClick={toggleCall}>
                          <span>+91{phone}</span>
                        </a>
                      </div>
                    </div>
                  ) : null}
                  {email !== '' ? (
                    <div className='emcontact-box d-flex'>
                      <div className='box-icon'>
                        <i className='flaticon-envelope'></i>
                      </div>
                      <div className='box-content'>
                        <p>Mail Us</p>
                        <a
                          href={`mailto:${email}`}
                          style={{ color: 'inherit' }}
                          onClick={toggleMail}
                        >
                          <span>{email}</span>
                        </a>
                      </div>
                    </div>
                  ) : null}
                  {customTab !== '' ? (
                    <div className='apply-btn'>
                      <a href={customTabLink} target='_blank' onClick={toggleSpeedLabs}>
                        {customTab}
                      </a>
                    </div>
                  ) : null}
                  {speedLabsBtn !== '' && customTab === '' ? (
                    <div className='apply-btn'>
                      <a href={speedLabsBtn} target='_blank'>
                        Speedlabs
                      </a>
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Navbar */}
        <section className='main-menu'>
          <Container>
            <Row>
              <Col md='12'>
                <div className='main-menu-box'>
                  <div className='menu-box d-flex'>
                    <ul className='nav menu-nav'>
                      {menu && menu[0] == 'Y' ? (
                        <li className='nav-item'>
                          <Link
                            className='nav-link'
                            to={process.env.PUBLIC_URL + '/'}
                            onClick={toggleHome}
                          >
                            Home
                          </Link>
                        </li>
                      ) : null}

                      {menu && menu[1] == 'Y' ? (
                        <li className='nav-item'>
                          <Link
                            className='nav-link'
                            to={process.env.PUBLIC_URL + '/about'}
                            onClick={toggleAbout}
                          >
                            About
                          </Link>
                        </li>
                      ) : null}

                      {menu && menu[2] == 'Y' ? (
                        <li className='nav-item'>
                          <Link
                            className='nav-link'
                            to={process.env.PUBLIC_URL + '/course-list'}
                            onClick={toggleCourses}
                          >
                            Courses
                          </Link>
                        </li>
                      ) : null}
                      {menu && menu[3] == 'Y' ? (
                        <li className='nav-item'>
                          <Link
                            className='nav-link'
                            to={process.env.PUBLIC_URL + '/packages'}
                            onClick={togglePackages}
                          >
                            {clientStore.webHash ==="ae7e2b3c76265700ab873612434b99c7" ? (<>Fee Structure</>):(<>Packages</>)}
                          </Link>
                        </li>
                      ) : null}
                      {menu && menu[4] == 'Y' ? (
                        <li className='nav-item'>
                          <Link
                            className='nav-link'
                            to={process.env.PUBLIC_URL + '/gallery'}
                            onClick={toggleGallery}
                          >
                            Gallery
                          </Link>
                        </li>
                      ) : null}
                      {menu && menu[7] == 'Y' ? (
                        <li className='nav-item'>
                          <a
                            className='nav-link'
                            href={'http://' + clientStore.webDetails.sub_domain}
                            target='blank'
                            onClick={toggleOnlineTest}
                          >
                            Online Test
                          </a>
                        </li>
                      ) : null}
                      {menu && menu[10] == 'Y' ? (
                        <li className='nav-item'>
                          <Link
                            className='nav-link'
                            to={process.env.PUBLIC_URL + '/payonline'}
                            onClick={togglePayOnline}
                          >
                            Pay Online
                          </Link>
                        </li>
                      ) : null}
                      {dynamicButton.status === 'success' ? (
                        <li className='nav-item'>
                          <Link
                            className='nav-link dropdown-toggle'
                            to={process.env.PUBLIC_URL + '/'}
                            data-toggle='dropdown'
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {dynamicButton.tab}{' '}
                            <RiArrowDropDownLine className='moreButton' />
                          </Link>
                          <ul className='dropdown list-unstyled'>
                            {dynamicButton.arr.length > 0 ? (
                              <div>
                                {dynamicButton.arr.map((el, i) => {
                                  return (
                                    <li className='nav-item' key={i}>
                                      <a
                                        className='nav-link'
                                        href={el.url}
                                        target='_blank'
                                      >
                                        {el.title}
                                      </a>
                                    </li>
                                  );
                                })}
                              </div>
                            ) : null}
                          </ul>
                        </li>
                      ) : null}
                      <li className='nav-item dropdown'>
                        <Link
                          className='nav-link dropdown-toggle'
                          to={process.env.PUBLIC_URL + '/'}
                          data-toggle='dropdown'
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          More <RiArrowDropDownLine className='moreButton' />
                        </Link>
                        <ul className='dropdown list-unstyled'>
                          {menu && menu[11] == 'Y' ? (
                            <li className='nav-item'>
                              <Link
                                className='nav-link'
                                to={process.env.PUBLIC_URL + '/contact'}
                              >
                                Contact
                              </Link>
                            </li>
                          ) : null}

                          <li className='nav-item'>
                            <Link
                              className='nav-link'
                              to={process.env.PUBLIC_URL + '/faq'}
                            >
                              FAQ
                            </Link>
                          </li>

                          {menu && menu[6] == 'Y' ? (
                            <li className='nav-item'>
                              <Link
                                className='nav-link'
                                to={process.env.PUBLIC_URL + '/career'}
                              >
                                Career Form
                              </Link>
                            </li>
                          ) : null}

                          {menu && menu[8] == 'Y' ? (
                            <li className='nav-item'>
                              <Link
                                className='nav-link'
                                to={process.env.PUBLIC_URL + '/franchise'}
                              >
                                Franchise Form
                              </Link>
                            </li>
                          ) : null}

                          {clientStore.webHash==="c58058e5ba190e08e89ab20864c6d05d" || clientStore.webHash==="3a23b580b4fe9096f8de084163cc806e" ?    (<></>):(<li className='nav-item'>
                            <Link
                              className='nav-link'
                              to={process.env.PUBLIC_URL + '/admission'}
                            >
                              Admission Form
                            </Link>
                          </li>)}
                          {webConfig.cms_alerts === 'true' ? (
                          <li className='nav-item'>
                            <Link
                              className='nav-link'
                              to={process.env.PUBLIC_URL + '/alerts'}
                            >
                              Alerts
                            </Link>
                          </li>):null}
                         

                          <li className='nav-item'>
                            <Link
                              className='nav-link'
                              to={process.env.PUBLIC_URL + '/achievements'}
                            >
                              Achievements
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Sticky Menu */}
        <StickyMenu logo={logo} />

        {/* Mobile Menu */}
        <MobileMenu />
      </Styles>
    );
};

export default Header;
