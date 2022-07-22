import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from './styles/mobileMenu.js';
import { useClientStore } from './../../contextProviders/clientContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { fetchDynamicButton } from './../../apis/api';
import { Observer } from 'mobx-react-lite';

function MobileMenu() {
  const clientStore = useClientStore();
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

  const menu = clientStore.webConfig.menu;
  const [webConfig, setWebConfig] = useState({});
  useEffect(() => {
    getDynamicButton();
  }, []);

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
  useEffect(() => {
    updateData();
  }, [phone, toggle, dataStatus]);

  const updateData = () => {
    if (clientStore.instituteDetails['About Us'] !== undefined && !dataStatus) {
      setPhone(clientStore.instituteDetails.Contact1);
      setEmail(clientStore.instituteDetails.Email1);
      setAddress(clientStore.instituteDetails.Address2);
      setLogo(
        `https://d2hp90zy5ktxok.cloudfront.net/website_logo/${clientStore.instituteDetails['Header Logo']}`
      );
      if (clientStore.instituteDetails['Custom Tab Name'] !== undefined) {
        setCustomTab(clientStore.instituteDetails['Custom Tab Name']);
        setCustomTabLink(clientStore.instituteDetails['Custom Link']);
      } else if (clientStore.instituteDetails['speedlabs_link'] !== undefined) {
        setSpeedLabsBtn(clientStore.instituteDetails['speedlabs_link']);
      }
      // setLogo(
      //   "https://d2hp90zy5ktxok.cloudfront.net/website_logo/" +
      //     clientStore.instituteDetails["Header Logo"]
      // );
      setDataStatus(true);
      // console.log("About Us Data ", obj);
      // }
    }
    if (!dataStatus) setToggle(toggle + 1);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dynamicOpen, setDynamicOpen] = useState(false);

  // const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

  return (
    <Observer>
      {() => {
        return (
          <Styles colors={clientStore.colors}>
            {/* Mobile Menu */}
            <section className='mobile-menu-area'>
              <Container>
                <Row>
                  <Col md='0' sm='12'>
                    <div className='mb-logo-area'>
                      <div className='mb-logo-box d-flex'>
                        <div className='mb-logo'>
                          <Link to={process.env.PUBLIC_URL + '/'}>
                            <img src={logo} alt='' className='logo-img'/>
                          </Link>
                          {/* <Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/f-logo.png"} alt="" /></Link> */}
                        </div>
                        <div
                          className='hm-button'
                          onClick={() => {
                            setIsOpen(true);
                          }}
                        >
                          <p id='mb-sidebar-btn'>
                            <AiOutlineMenu />
                            {/* <i className="las la-bars"></i> */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>

            {/* Mobile Menu Sidebar */}
            <section
              className={`mb-sidebar ${isOpen ? 'opened' : ''}`}
              id='mb-sidebar-body'
            >
              <div className='mb-sidebar-heading d-flex justify-content-between'>
                <div>
                  <h5>Menu</h5>
                </div>
                <div
                  className='close-menu-btn'
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>

              <div className='mb-sidebar-menu'>
                {menu && menu[0] == 'Y' ? (
                  <div className='mb-menu-item'>
                    <button className='mb-menu-button active'>
                      <p>
                        <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
                      </p>
                    </button>
                  </div>
                ) : null}
                {menu && menu[1] == 'Y' ? (
                  <div className='mb-menu-item'>
                    <button className='mb-menu-button'>
                      <p>
                        <Link to={process.env.PUBLIC_URL + '/about'}>
                          About
                        </Link>
                      </p>
                    </button>
                  </div>
                ) : null}
                {menu && menu[2] == 'Y' ? (
                  <div className='mb-menu-item'>
                    <button className='mb-menu-button'>
                      <p>
                        <Link to={process.env.PUBLIC_URL + '/course-list'}>
                          Courses
                        </Link>
                      </p>
                    </button>
                  </div>
                ) : null}
                {menu && menu[3] == 'Y' ? (
                  <div className='mb-menu-item'>
                    <button className='mb-menu-button'>
                      <p>
                        <Link to={process.env.PUBLIC_URL + '/packages'}>
                        {clientStore.webHash === "ae7e2b3c76265700ab873612434b99c7" ? (<>Fee Structure</>):(<>Packages</>)}
                        </Link>
                      </p>
                    </button>
                  </div>
                ) : null}
                {menu && menu[4] == 'Y' ? (
                  <div className='mb-menu-item'>
                    <button className='mb-menu-button'>
                      <p>
                        <Link to={process.env.PUBLIC_URL + '/gallery'}>
                          Gallery
                        </Link>
                      </p>
                    </button>
                  </div>
                ) : null}
                {menu && menu[7] == 'Y' ? (
                  <div className='mb-menu-item'>
                    <button className='mb-menu-button'>
                      <p>
                        <a
                          href={'http://' + clientStore.webDetails.sub_domain}
                          target='blank'
                        >
                          Online Test
                        </a>
                      </p>
                    </button>
                  </div>
                ) : null}
                {menu && menu[10] == 'Y' ? (
                  <div className='mb-menu-item'>
                    <button className='mb-menu-button'>
                      <p>
                        <Link to={process.env.PUBLIC_URL + '/payonline'}>
                          Pay Online
                        </Link>
                      </p>
                    </button>
                  </div>
                ) : null}
                {dynamicButton.status === 'success' ? (
                  <div className='mb-menu-item'>
                    <button
                      className='mb-menu-button'
                      onClick={() => {
                        setDynamicOpen(!dynamicOpen);
                      }}
                    >
                      <p>
                        {dynamicButton.tab} <i className='las la-plus'></i>
                      </p>
                    </button>
                    <div
                      className={`mb-menu-content ${dynamicOpen ? 'show' : ''}`}
                    >
                      <ul className='list-unstyled'>
                        {dynamicButton.arr.length > 0 ? (
                          <div>
                            {dynamicButton.arr.map((el, i) => {
                              return (
                                <li className='nav-item' key={i}>
                                  <a
                                    style={{ textTransform: 'uppercase' }}
                                    href={el.url}
                                  >
                                    {el.title}
                                  </a>
                                </li>
                              );
                            })}
                          </div>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                ) : null}
                <div className='mb-menu-item'>
                  <button
                    className='mb-menu-button'
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    <p>
                      More<i className='las la-plus'></i>
                    </p>
                  </button>
                  <div className={`mb-menu-content ${menuOpen ? 'show' : ''}`}>
                    <ul className='list-unstyled'>
                      <li className='nav-item'>
                        <Link to={process.env.PUBLIC_URL + '/contact'}>
                          Contact
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link to={process.env.PUBLIC_URL + '/faq'}>FAQ</Link>
                      </li>

                      {menu && menu[6] == 'Y' ? (
                        <li className='nav-item'>
                          <Link to={process.env.PUBLIC_URL + '/career'}>
                            Career Form
                          </Link>
                        </li>
                      ) : null}
                      {menu && menu[8] == 'Y' ? (
                        <li className='nav-item'>
                          <Link to={process.env.PUBLIC_URL + '/franchise'}>
                            Franchise Form
                          </Link>
                        </li>
                      ) : null}
                      {clientStore.webHash==="c58058e5ba190e08e89ab20864c6d05d" || clientStore.webHash==="3a23b580b4fe9096f8de084163cc806e"  ?   (<></>):(<li className='nav-item'>
                            <Link
                              
                              to={process.env.PUBLIC_URL + '/admission'}
                            >
                              Admission Form
                            </Link>
                          </li>)}
                          {webConfig.cms_alerts === 'true' ? (
                            <li className='nav-item'>
                              <Link to={process.env.PUBLIC_URL + '/alerts'}>
                                Alerts
                              </Link>
                            </li>):null}

                      {/* <li className='nav-item'>
                        {customTab !== '' ? (
                            <div className='apply-btn'>
                              <a href={customTabLink} target='_blank'>
                                {customTab} llll
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
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <div
              className={`mb-sidebar-overlay ${isOpen ? 'visible' : ''}`}
              id='mb-sidebar-overlay'
            ></div>
          </Styles>
        );
      }}
    </Observer>
  );
}

export default MobileMenu;
