import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ModalImage from 'react-modal-image';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import { Styles } from './styles/gallery.js';
import { fetchImages, fetchVideo ,fetchPdf } from '../../apis/api';
import { useClientStore } from '../../contextProviders/clientContext';
import { Observer } from 'mobx-react';
import Loader from '../../Loader';
import PageNotFound from '../404/PageNotFound';
import pdf_img from "../../images/pdf.png";


const Gallery = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(false);
  const [videos, setVideos] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [empty, setEmpty] = useState(false);
  const clientStore = useClientStore();

  useEffect(() => {
    fetchImages(clientStore.webHash, 100)
      .then((data) => {
        if (data.status === 'success') {
          setImages(data.response);
          setStatus(true);
        } else setEmpty(true);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchVideo(clientStore.webHash, 100)
      .then((data) => {
        if (data.status === 'success') {
          setVideos(data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetchPdf(clientStore.webHash, 100)
      .then((data) => {
        console.log('pdf',data.response);
        if (data.status === 'success') {
          setPdf(data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const [Styles, setStyles] = useState(StyleFun(clientStore.colors));
  const [bread, setBread] = useState(true);
  const notFound = () => {
    setBread(false);
    return <PageNotFound />;
  };

  return (
    <Observer>
      {() => {
        return (
          <Styles colors={clientStore.colors}>
            {/* Main Wrapper */}
            <div className='main-wrapper gallery-page'>
              {bread ? <BreadcrumbBox title='Gallery' /> : null}

              {/* Gallery Area */}
              {status ? (
                <section className='gallery-page-area'>
                  <Container>
                    <h3
                      style={{
                        marginBottom: '20px',
                      }}
                    >
                      <span
                        style={{
                          borderBottom: '3px solid',
                          padding: '5px',
                        }}
                      >
                        Photos
                      </span>
                    </h3>
                    <Row>
                      {images.map((data, i) => (
                        <Col lg='4' sm='6' key={i}>
                          <div className='gallery-box'>
                            <ModalImage
                              small={data.url}
                              alt=''
                              large={data.url}
                            />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                  <div
                    style={{
                      marginTop: '20px',
                      backgroundColor: '#eeeeee',
                      padding: '50px',
                    }}
                  >
                    <Container>
                      <h3
                        style={{
                          marginBottom: '20px',
                        }}
                      >
                        <span
                          style={{
                            borderBottom: '3px solid',
                            padding: '5px',
                          }}
                        >
                          Videos
                        </span>
                      </h3>
                      <Row>
                        {videos.map((video, index) => {
                          return (
                            <Col lg='4' sm='6' key={index}>
                              <div className='gallery-box embed-responsive embed-responsive-16by9'>
                                <iframe
                                  width='auto'
                                  height='auto'
                                  className='rounded embed-responsive-item'
                                  src={video.video_link.replace(
                                    'watch?v=',
                                    'embed/'
                                  )}
                                  allowFullScreen='allowfullscreen'
                                ></iframe>
                                <h5 className='mb-0'>{video.video_title}</h5>
                                <p>{video.desc}</p>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Container>
                  </div>
                  <div
                    style={{
                      backgroundColor: '#eeeeee',
                      padding: '50px',
                    }}
                  >
                    <Container>
                      <h3
                        style={{
                          marginBottom: '20px',
                        }}
                      >
                        <span
                          style={{
                            borderBottom: '3px solid',
                            padding: '5px',
                          }}
                        >
                          Pdf
                        </span>
                      </h3>
                      <Row>
                       

                            {pdf.map((pdf, index) => {
                                        return (
                                              <Col sm={4} key={index}>
                                                <div class="gallery-box embed-responsive embed-responsive-16by9 pdfDiv">
                                                    <div style={{marginBottom:'10px !important'}}> 
                                                       
                                                        <a href={pdf.url}>
                                                        <img
                                                        className='rounded embed-responsive-item pdfDiv_img'
                                                                style={{width: 'auto',height: '200px'}}
                                                                src={pdf_img} alt="............." 
                                                                allowFullScreen='allowfullscreen'
                                                                />
                                                                <br/> 
                                                        <h3 className="pdfDiv_title" style={{marginRight: '10px !important',color:'black'}}>{pdf.title}</h3>
                                                        </a>
                                                    </div>      
                                                </div>
                                            </Col>
                                        )
                                    })}
                      </Row>
                    </Container>
                  </div>
                </section>
              ) : empty ? (
                notFound()
              ) : (
                <Loader />
              )}
            </div>
          </Styles>
        );
      }}
    </Observer>
  );
};

export default Gallery;
