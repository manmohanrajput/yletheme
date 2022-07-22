import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import { Styles } from './styles/course.js';
import { useParams } from 'react-router-dom';
import { useClientStore } from '../../contextProviders/clientContext';
import { Observer } from 'mobx-react';
import { fetchCourseDetailsById } from './../../apis/api';
import PageNotFound from '../404/PageNotFound';
import Loader from '../../Loader';
import ReactGA from "react-ga";
const CourseDetails = () => {
  let { courseID } = useParams();
  useEffect(() => {
    const courseButton = document.querySelectorAll('.course-button');
    courseButton.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        const content = button.nextElementSibling;

        if (button.classList.contains('active')) {
          content.className = 'course-content show';
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.className = 'course-content';
          content.style.maxHeight = '0';
        }
      });
    });
  }, []);
  const clientStore = useClientStore();
  const [dataStatus, setDataStatus] = useState(false);
  const [courseName, setCourseName] = useState(' ');
  const [courseDesc, setCourseDesc] = useState(' ');
  const [courseOverview, setCourseOverview] = useState(' ');
  const [courseKeyBenefits, setCourseKeyBenefits] = useState(' ');
  const [courseEligibility, setCourseEligibility] = useState(' ');
  const [courseImage, setCourseImage] = useState(" ");
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    getCourseData();
  }, []);
  const toggleDescription=()=>{
    ReactGA.event({
      category: 'Description Button',
      action: 'Description clicked!',
      label: 'After clicking on Description,course description will be display!'
    })
  }
  const toggleOverview=()=>{
    ReactGA.event({
      category: 'Overview Button',
      action: 'Overview clicked!',
      label: 'After clicking on Overview,course Overview will be display!'
    })
  }
  const toggleKeyBenefits=()=>{
    ReactGA.event({
      category: 'KeyBenefits Button',
      action: 'KeyBenefits clicked!',
      label: 'After clicking on KeyBenefits,course KeyBenefits will be display!'
    })
  }
  const toggleEligibility=()=>{
    ReactGA.event({
      category: 'Eligibility Button',
      action: 'Eligibility clicked!',
      label: 'After clicking on Eligibility,course Eligibility will be display!'
    })
  }
  const getCourseData = async () => {
    const res = await fetchCourseDetailsById(clientStore.webHash, courseID);
    if (res.status === 'success') {
      setCourseName(res.response[0]['course_name']);
      setCourseDesc(res.response[0]['course_detail']);
      setCourseOverview(res.response[0]['course_overview']);
      setCourseKeyBenefits(res.response[0]['course_key_benefits']);
      setCourseEligibility(res.response[0]['course_eligibility']);
      setCourseImage(res.response[0]["course_image"]);
      setDataStatus(true);
    } else setEmpty(true);
  };

  // const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

  const [bread, setBread] = useState(true);
  const notFound = () => {
    setBread(false);
    return <PageNotFound />;
  };

  return (
    <Observer>
      {() => {
        return (
          <div className='main-wrapper course-details-page'>
            {/* Header 2 */}
            {/* <HeaderTwo /> */}

            {/* Breadcroumb */}
            {bread ? <BreadcrumbBox title='Course Details' /> : null}

            <Styles colors={clientStore.colors}>
              {/* Course Details */}
              {dataStatus ? (
                <section className='course-details-area'>
                  <Container>
                    <Row>
                      <Col lg='9' md='10' sm='12' style={{ margin: 'auto' }}>
                        <div className='course-details-top'>
                          <div className='heading'>
                            <h4> Course : {courseName}</h4>
                          </div>

                          <div className='course-details-banner'>
                            <img
                              src={courseImage}
                              alt=''
                              className='img-fluid'
                            />
                          </div>
                          <div className='course-tab-list'>
                            <Tab.Container defaultActiveKey='description'>
                              <Nav className='flex-column'>
                                <Nav.Item>
                                  <Nav.Link eventKey='description' onClick={toggleDescription(false)}>
                                    Description
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey='overview' onClick={toggleOverview(false)}>
                                    Overview
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey='key_benefits' onClick={toggleKeyBenefits(false)}>
                                    Key Benefits
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey='eligibility' onClick={toggleEligibility(false)}>
                                    Eligibility
                                  </Nav.Link>
                                </Nav.Item>
                              </Nav>
                              <Tab.Content>
                                <Tab.Pane
                                  eventKey='description'
                                  className='overview-tab'
                                >
                                  <div className='course-desc'>
                                    <h5>Course Description</h5>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: courseDesc,
                                      }}
                                    ></p>
                                  </div>
                                </Tab.Pane>
                                <Tab.Pane
                                  eventKey='overview'
                                  className='curriculum-tab'
                                >
                                  <div className='course-curriculum'>
                                    <h5>Course Overview</h5>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: courseOverview,
                                      }}
                                    ></p>
                                  </div>
                                </Tab.Pane>
                                <Tab.Pane
                                  eventKey='key_benefits'
                                  className='instructor-tab'
                                >
                                  <h5>Course Key Benefits</h5>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: courseKeyBenefits,
                                    }}
                                  ></p>
                                </Tab.Pane>
                                <Tab.Pane
                                  eventKey='eligibility'
                                  className='review-tab'
                                >
                                  <Row>
                                    <Col md='12'>
                                      {/* <div className="review-comments"> */}
                                      <h5>Course Eligibility</h5>
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: courseEligibility,
                                        }}
                                      ></p>
                                    </Col>
                                  </Row>
                                </Tab.Pane>
                              </Tab.Content>
                            </Tab.Container>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </section>
              ) : empty ? (
                notFound()
              ) : (
                <Loader />
              )}
            </Styles>
          </div>
        );
      }}
    </Observer>
  );
};

export default CourseDetails;
