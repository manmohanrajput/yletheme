import styled from 'styled-components';

// export const StyleFun = (colors) => {
export const Styles = styled.div`
  footer.footer1 {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    padding: 80px 0 55px;

    &:before {
      position: absolute;
      content: '';
      background: ${({ colors }) => colors.bg1};
      opacity: 0.98;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .footer-logo-info {
      img {
        margin-bottom: 30px;

        @media (max-width: 575px) {
          margin-bottom: 20px;
        }
      }

      p {
        font-size: 14px;
        color: ${({ colors }) => colors.text5};
        line-height: 28px;
        margin-bottom: 20px;
      }

      ul {
        li {
          color: ${({ colors }) => colors.text5};
          margin-bottom: 12px;

          svg {
            font-size: 18px;
            color: ${({ colors }) => colors.green};
            width: 35px;
            vertical-align: top;
          }
        }
      }

      @media (max-width: 767px) {
        margin-bottom: 30px;
      }
    }

    .f-links {
      width: 100%;
      padding-left: 80px;
      h5 {
        color: ${({ colors }) => colors.border1};
        text-transform: uppercase;
        margin-top: 8px;
        margin-bottom: 35px;

        @media (max-width: 575px) {
          margin-bottom: 15px;
          font-size: 20px;
        }
      }

      ul {
        // float: left;
        // width: 50%;

        li {
          a {
            font-size: 14px;
            color: ${({ colors }) => colors.text5};
            line-height: 38px;

            svg {
              font-size: 12px;
              color: ${({ colors }) => colors.green};
              margin-right: 10px;
            }

            &:hover {
              color: ${({ colors }) => colors.green};
            }

            @media (max-width: 991px) {
              font-size: 13px;
              letter-spacing: 0;
            }
          }
        }
      }

      @media (max-width: 767px) {
        margin-bottom: 20px;
        display: inline-block;
        padding-left: 0px;
      }
    }

    .f-post {
      h5 {
        color: ${({ colors }) => colors.border1};
        text-transform: uppercase;
        margin-top: 8px;
        margin-bottom: 45px;

        @media (max-width: 575px) {
          margin-bottom: 15px;
          font-size: 20px;
        }
      }

      .post-box {
        margin-bottom: 12px;

        .post-img {
          img {
            max-width: 80px;
            border-radius: 5px;
            margin-right: 15px;
          }
        }

        .post-content {
          a {
            font-size: 14px;
            color: ${({ colors }) => colors.text5};
            display: inline-block;
            margin-bottom: 10px;

            &:hover {
              color: ${({ colors }) => colors.green};
            }

            @media (max-width: 991px) {
              font-size: 13px;
              letter-spacing: 0;
              margin-bottom: 0;
            }
          }

          span {
            display: block;
            color: ${({ colors }) => colors.text2};
          }
        }
      }
    }

    @media (max-width: 767px) {
      padding: 50px 0 20px;
    }
  }

  .copyright-area {
    padding: 35px 0 38px;
    background: ${({ colors }) => colors.copy_bg};

    .copy-text {
      p {
        color: ${({ colors }) => colors.text5};
        padding-top: 3px;

        i {
          color: ${({ colors }) => colors.green};
          margin: 0 2px;
        }

        a {
          color: ${({ colors }) => colors.green};

          &:hover {
            text-decoration: underline;
          }
        }
      }

      @media (max-width: 767px) {
        text-align: center;
        margin-bottom: 20px;
      }
    }

    ul.social {
      li {
        a {
          text-align: center;
          position: relative;

          &:before {
            content: '';
            position: absolute;
            border-width: 8px 14px;
            border-style: solid;
            border-top-color: transparent;
            border-right-color: transparent;
            border-left-color: transparent;
            top: -16px;
            left: 0;
            z-index: 1;
            transition: all 0.2s ease;
          }

          &:after {
            content: '';
            position: absolute;
            border-width: 8px 14px;
            border-style: solid;
            border-right-color: transparent;
            border-bottom-color: transparent;
            border-left-color: transparent;
            bottom: -16px;
            left: 0;
            z-index: 1;
            transition: all 0.2s ease;
          }

          i {
            font-size: 14px;
            color: #ffffff;
            width: 28px;
          }

          &:hover {
            background-color: ${({ colors }) => colors.green} !important;

            &:before {
              border-bottom-color: ${({ colors }) => colors.green} !important;
            }

            &:after {
              border-top-color: ${({ colors }) => colors.green} !important;
            }
          }
        }

        &:nth-child(1) {
          a {
            background-color: #4267b2;

            &:before {
              border-bottom-color: #4267b2;
            }

            &:after {
              border-top-color: #4267b2;
            }
          }
        }

        &:nth-child(2) {
          a {
            background-color: #1da1f2;

            &:before {
              border-bottom-color: #1da1f2;
            }

            &:after {
              border-top-color: #1da1f2;
            }
          }
        }

        &:nth-child(3) {
          a {
            background-color: #2867b2;

            &:before {
              border-bottom-color: #2867b2;
            }

            &:after {
              border-top-color: #2867b2;
            }
          }
        }

        &:nth-child(4) {
          a {
            background-color: #dd1343;

            &:before {
              border-bottom-color: #dd1343;
            }

            &:after {
              border-top-color: #dd1343;
            }
          }
        }

        &:nth-child(5) {
          a {
            background-color: #ea4c89;

            &:before {
              border-bottom-color: #ea4c89;
            }

            &:after {
              border-top-color: #ea4c89;
            }
          }
        }
      }

      @media (max-width: 767px) {
        text-align: center;
      }
    }
  }
`;

//     return Styles

// }
