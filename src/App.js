import React, { useEffect, useState } from 'react';
import './App.css';
import ReactGA from "react-ga";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './helper/ScrollToTop';
import { GlobalStyles } from './components/common/styles/global.js';
import HomeOne from './HomeOne';
import About from './pages/about/About';
import CourseList from './pages/courses/CourseList';
import CourseDetails from './pages/courses/CourseDetails';
import Gallery from './pages/gallery/Gallery';
import Career from './pages/forms/career';
import Franchise from './pages/forms/franchise';
import Admission from './pages/forms/admission';
import Contact from './pages/contact/Contact';
import Faq from './pages/faq/Faq';
import PageNotFound from './pages/404/PageNotFound';
import ComingSoon from './pages/comingsoon/ComingSoon';
import BlogGrid from './pages/blog/BlogGrid';
import BlogDetails from './pages/blog/BlogDetails';
import Packages from './pages/packages/Packages';
import Alert from './pages/alert/Alert';
import Achievements from './pages/achievements/Achievements';
import Batches from './pages/batches/Batches';
import PayOnline from './pages/payonline/PayOnline';
import QuickTest from './pages/quick-test/QuickTest';
import Expire from './pages/expire/Expire';

// Additional Swiper Css for adding functionality
import 'swiper/swiper-bundle.css';

// Importing APIs

import { fetchInstituteDetails, fetchWebData, fetchWebHash } from './apis/api';

// Importing MobX and Stores
import { useClientStore } from './contextProviders/clientContext';
import { Observer } from 'mobx-react';
import Loader from './Loader';
import Header from './components/Header';
import HeaderTwo from './components/HeaderTwo';
import Footer from './components/Footer';
import Privacy from './components/Privacy';
import Refund from './components/Refund';
import Term from './components/Term';

const App = () => {
  const clientStore = useClientStore();
  const [domain, setDomain] = useState('');
  const [show, setShow] = useState(true);
  const [webStatus, setWebStatus] = useState(false);
   // create a tracker named 'foo' for property UA-XXXXX-Y
   useEffect(() => {
    ReactGA.initialize('UA-216098995-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  
  useEffect(() => {
    // setDomain(window.location.href);
    // setDomain('http://ekart.educms.in')
    // setDomain('http://suryamodelschool.com/');
    // setDomain('http://www.mutopperclasses.com/')
    setDomain('http://theanantah.com');
    // setDomain('http://www.g10educationalplatform.co.in/')
    // setDomain('http://vkraptitude.com/');
    // setDomain('http://atullearningforum.com/');
    // setDomain('http://www.xuberancelife.com');
    // setDomain('http://futureprepacademy.in/')
    // setDomain('http://www.gohiltutorials.in/')
    // setDomain('http://www.harekrishnaacademy.com/')
    // setDomain('https://www.omaircomputeracademy.com/')
    // setDomain('http://www.nutanclasses.com/');
    // setDomain('http://coachingparadise.in/')
    // setDomain('http://plus-institute.com/')
    // setDomain('http://commerce2.educms.in/')
    // setDomain('https://www.edubell.in/')
    // setDomain('http://www.greaterheightspublicschool.in/');
    // setDomain('https://site35.mycareerlift.com/')
    //  setDomain('http://edulyn.educms.in/')
    getWebHash();
  }, [domain]);

  useEffect(() => {
    if (webStatus) {
      getWebData();
      getInstituteDetails();
    }
  }, [webStatus]);

  const getWebHash = async () => {
    let str = domain.split('/');
    let temp = str[2];
    console.log('temp', temp);
    if (domain != '') {
      const res = await fetchWebHash(temp);
      if (res.status === 'success') {
        console.log('Hash Value', res);
        clientStore.webHash = res.response[0]['inst_hash'];
        clientStore.expiryDate = res.response[0]['expiry_date'];
        setWebStatus(true);
      }
    }
  };

  const getInstituteDetails = async () => {
    const res = await fetchInstituteDetails(clientStore.webHash);
    if (res.status === 'Success') {
      clientStore.instituteDetails = res.response;
      console.log('institute', res);
      clientStore.logo =
        'https://d2hp90zy5ktxok.cloudfront.net/website_logo/' +
        res.response['Header Logo'];
    }
  };

  const [colors, setColors] = useState(clientStore.colors);
  // const [GlobalStyle, setGlobalStyle] = useState(GlobalStyleFun(colors));

  const getWebData = async () => {
    const res = await fetchWebData(clientStore.webHash);
    console.log('web Json', res);
    document.title = res.detail.web_title;
    clientStore.webDetails = res.detail;
    clientStore.webConfig = res.config;
    document
      .getElementById('favicon')
      .setAttribute('href', res.detail['header_logo']);
    clientStore.webLayout = res.layout;
    // let colObj = clientStore.colors;
    let colObj = clientStore.updateColors(res.layout);
    setColors(colObj);
    // setGlobalStyle(GlobalStyleFun(colObj))
    setShow(false);
  };
    const [modalShow, setModalShow] = useState(true);
  
    var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10) 
      {
            dd='0'+dd;
      } 
      if(mm<10) 
      {
            mm='0'+mm;
      } 
      var today1 = new Date(yyyy+'-'+mm+'-'+dd) ;
      console.log(today);

      // Expiry
      var expire=clientStore.expiryDate;
      var result= new Date(expire);
      var d2 = result.getDate();
      var m2 = result.getMonth()+1; 
      var y2 = result.getFullYear();
      // console.log("d2",d2)
      // console.log("y2",y2)
      console.log("m2",m2)
      if(d2<10) 
      {
            d2='0'+d2;
      } 
      if(m2<10) 
      {
            m2='0'+m2;
      }
      // console.log("Current Date :\t",today1);
      // console.log("Expiry Date :\t",result);
      const packagesexp = setTimeout(() => {
      <Expire/> 
      }, 1000);
     return result<today1?( <div><Expire/></div>):( 
       (
          <Observer>  
          {() => {
            return (
              <Router>
                {show ? (
                  <div style={{ height: '100vh' }}>
                    <Loader />
                  </div>
                ) : null}
                <GlobalStyles colors={colors} />
                <ScrollToTop />
    
                {!show ? (
                  <div>
                    {/* <div className="root-div">
                    <div className="speedLabs-btn">
                      <a href="#">SpeedLabs</a>
                    </div> */}
                    <Header />
                    <HeaderTwo />
                    <Switch>
                      <Route
                        exact
                        path={`${process.env.PUBLIC_URL + '/'}`}
                        component={HomeOne}
                      />
    
                      <Route path={`${process.env.PUBLIC_URL + '/about'}`}>
                        {clientStore.webConfig.cms_institute_details === 'true' ? (
                          <About />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route path={`${process.env.PUBLIC_URL + '/course-list'}`}>
                        {clientStore.webConfig.cms_course === 'true' ? (
                          <CourseList />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route
                        path={`${
                          process.env.PUBLIC_URL + '/course-details/:courseID'
                        }`}
                      >
                        {clientStore.webConfig.cms_course === 'true' ? (
                          <CourseDetails />
                        ) : (
                          <></>
                        )}
                      </Route>
                      <Route path={`${process.env.PUBLIC_URL + '/gallery'}`}>
                        {clientStore.webConfig.cms_images === 'true' ? (
                          <Gallery />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route path={`${process.env.PUBLIC_URL + '/contact'}`}>
                        {clientStore.webConfig.cms_contact_details === 'true' ? (
                          <Contact />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route path={`${process.env.PUBLIC_URL + '/alerts'}`}>
                        {clientStore.webConfig.cms_alerts === 'true' ? (
                          <Alert />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route path={`${process.env.PUBLIC_URL + '/batches'}`}>
                        {clientStore.webConfig.cms_batch === 'true' ? (
                          <Batches />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route path={`${process.env.PUBLIC_URL + '/blog-grid'}`}>
                        {clientStore.webConfig.cms_blogs === 'true' ? (
                          <BlogGrid />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route
                        path={`${process.env.PUBLIC_URL + '/blog-details/:blogID'}`}
                      >
                        {clientStore.webConfig.cms_blogs === 'true' ? (
                          <BlogDetails />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route path={`${process.env.PUBLIC_URL + '/packages'}`}>
                        {clientStore.webConfig.cms_course === 'true' ? (
                          <Packages />
                        ) : (
                          <></>
                        )}
                      </Route>

    
                      <Route
                        path={`${process.env.PUBLIC_URL + '/career'}`}
                        component={Career}
                      />
                      <Route
                        path={`${process.env.PUBLIC_URL + '/franchise'}`}
                        component={Franchise}
                      />
                      <Route
                        path={`${process.env.PUBLIC_URL + '/privacy'}`}
                        component={Privacy}
                      />
                      <Route
                        path={`${process.env.PUBLIC_URL + '/refund'}`}
                        component={Refund}
                      />
                      <Route
                        path={`${process.env.PUBLIC_URL + '/term'}`}
                        component={Term}
                      />
    
                      <Route path={`${process.env.PUBLIC_URL + '/admission'}`}>
                        {clientStore.webConfig.cms_admission === 'true' ? (
                          <Admission />
                        ) : (
                          <></>
                        )}
                      </Route>
    
                      <Route
                        path={`${process.env.PUBLIC_URL + '/faq'}`}
                        component={Faq}
                      />
    
                      <Route
                        path={`${process.env.PUBLIC_URL + '/achievements'}`}
                        component={Achievements}
                      />
                      <Route
                        path={`${process.env.PUBLIC_URL + '/payonline'}`}
                        component={PayOnline}
                      />
                      <Route
                        path={`${process.env.PUBLIC_URL + '/404'}`}
                        component={PageNotFound}
                      />
                      <Route
                        path={`${process.env.PUBLIC_URL + '/coming-soon'}`}
                        component={ComingSoon}
                      />
                      <Route
                        path={`${process.env.PUBLIC_URL + '/quicktest'}`}
                        component={QuickTest}
                      />
                      {/* <Route
                        path={`${process.env.PUBLIC_URL + '/expire'}`}
                        component={Expire}
                      /> */}
                      
                      
                      <Route
                        path={`${process.env.PUBLIC_URL + '/'}`}
                        component={PageNotFound}
                      />
                    </Switch>{' '}
                    <Footer />{' '}
                  </div>
                ) : null}
              </Router>
            );
          }}
        </Observer>
      )
    )
  };
export default App;
