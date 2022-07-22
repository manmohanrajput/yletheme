import React, { useEffect, useState } from 'react';
import Datas from '../data/course/filter.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from './styles/courseFilter.js';
import { fetchTopCourses } from './../apis/api';
import { useClientStore } from './../contextProviders/clientContext';
import { Observer } from 'mobx-react';
import { buildCourse } from '../utility';
import ReactGA from "react-ga";
import courseImage  from '../images/Science.png'
function CourseFilter() {
  const clientStore = useClientStore();
  const [dataArray, setDataArray] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  // const [Styles, setStyles] = useState(StyleFun(clientStore.colors))

  useEffect(() => {
    getTopCourses();
  }, [dataStatus]);

  const getTopCourses = async () => {
    const res = await fetchTopCourses(clientStore.webHash, 3);
    if (res.status === 'success') {
      clientStore.topCourses = buildCourse(res.response);
      setDataArray(clientStore.topCourses);
      setDataStatus(true);
    }
  };
  const toggleViewAllCourses=()=>{
    ReactGA.event({
      category: 'View all Courses Button',
      action: 'View all Courses clicked!',
      label: 'After clicking on View all courses,all courses information will be display!'
    })
  }
  const toggleViewCoursesImages=()=>{
    ReactGA.event({
      category: 'View Courses Images Button',
      action: 'View Courses Images block clicked!',
      label: 'After clicking on View Courses Images block,course details will be display!'
    })
  }
  return dataStatus ? (
    <Observer>
      {() => {
        return (
          <Styles colors={clientStore.colors}>
            {/* Course Area */}
            <section className='course-filter'>
              <Container>
                <Row>
                  <Col md='12'>
                    <div className='sec-title text-center'>
                      <h4>{Datas.secTitle}</h4>
                    </div>
                  </Col>
                  <Col md='12'>
                    <Row className='filter-items'>
                      {dataArray.map((data, i) => (
                        <Col lg='4' md='6' key={i} data-id={data.targetId}>
                          <div className='course-item' onClick={toggleViewCoursesImages(false)}>
                            <Link to={process.env.PUBLIC_URL + data.courseLink}>
                             {data.imgUrl.length>0  ? <>
                              <div
                                className='course-image'
                                style={{
                                  backgroundImage: `url(${data.imgUrl})`,
                                  // height: '50px',
                                }}
         
                              >
                              </div>
                             </>:
                             <>
                              <div
                                className='course-image'
                                style={{
                                  backgroundImage: `url(${data.default_img})`,
                                }}
                              >
                              </div>
                             </>}
                            </Link>
                            <div className='course-content'>
                              {/* <img src={data.imgUrl} alt=""/> */}
                              <h6 className='heading'>
                                <Link
                                  to={process.env.PUBLIC_URL + data.courseLink}
                                >
                                  {data.courseTitle}
                                </Link>
                              </h6>
                              {dataStatus ? (
                                <p
                                  className='desc'
                                  style={{ overflow: 'hidden' }}
                                  dangerouslySetInnerHTML={{
                                    __html: `${data.courseDesc.slice(
                                      0,
                                      200
                                    )} ...`,
                                  }}
                                ></p>
                              ) : (
                                <p className='desc'>{data.courseDesc}</p>
                              )}
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col md='12' className='text-center'>
                    <div className='viewall-btn'>
                      <Link to={process.env.PUBLIC_URL + '/course-list'} onClick={toggleViewAllCourses(false)}>
                        View All Courses
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Styles>
        );
      }}
    </Observer>
  ) : null;
}

export default CourseFilter;
