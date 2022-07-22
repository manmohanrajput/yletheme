import styled from 'styled-components';
import { colors } from '../element/elements.js';
// import { colorStore } from "../common/element/elements.js";
// let colors = colorStore.getColor();

// export const StyleFun = (colors) => {

export const Styles = styled.div`
  .mobile-menu-area {
    // background : ${({ colors }) => colors.bg1};
    display: none;
    .mb-topbar {
      border-bottom: 1px solid ${({ colors }) => colors.black2};
      .topbar-item {
        p {
          font-size: 13px;
          color: ${({ colors }) => colors.text4};
          padding: 8px 0;
          i {
            font-size: 16px;
            color: ${({ colors }) => colors.green};
            vertical-align: text-top;
            margin-right: 5px;
          }
        }
        ul {
          padding: 8px 0;
          li {
            a {
              font-size: 13px;
              color: ${({ colors }) => colors.green};
              font-weight: 500;
              text-transform: uppercase;
              &:hover {
                color: #ffffff;
              }
            }
            &:nth-child(2) {
              color: ${({ colors }) => colors.text3};
            }
          }
        }
      }
    }

    .mb-logo-area {
      padding: 18px 0;
      .mb-logo-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        // background-color:red;
        .hm-button {
          margin-top: 8px;
          margin-right: 35px;
          position: relative;
          // &:before {
          //     position: absolute;
          //     content : "";
          //     background : ${({ colors }) => colors.text1};
          //     width: 1px;
          //     height: 25px;
          //     top: -4px;
          //     right: -16px;
          // }
          a#mb-sidebar-btn {
            i {
              font-size: 20px;
              color: ${({ colors }) => colors.green};
            }
          }

          @media (max-width: 480px) {
            margin-top: 6px;
            margin-right: 8px;
            &:before {
              content: none;
            }
          }
        }
        .mb-logo {
          a {
            img {
              max-width: 150px;
              @media (max-width: 480px) {
                max-width: 150px;
              }
              @media (max-width: 991px) {
                max-width: 200px;
              }
            }
          }
        }
      }

      .mb-search-box {
        form {
          width: 170px;
          position: relative;
          input {
            width: 100%;
            height: 35px;
            border: 1px solid ${({ colors }) => colors.text2};
            background: transparent;
            color: #ffffff;
            border-radius: 5px;
            padding-left: 15px;
            &::placeholder {
              font-size: 14px;
              color: ${({ colors }) => colors.text3};
            }
            &:focus {
              border-color: ${({ colors }) => colors.green};
            }

            @media (max-width: 480px) {
              max-width: 280px;
            }

            @media (max-width: 320px) {
              display: none;
            }
          }
          button {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 40px;
            background: transparent;
            border: none;
            font-size: 16px;
            color: ${({ colors }) => colors.green};
            i {
            }

            @media (max-width: 320px) {
              display: none;
            }
          }

          @media (max-width: 480px) {
            max-width: 130px;
          }
        }
      }
    }

    @media (max-width: 991px) {
      display: block;
    }
  }

  .mb-sidebar {
    background: #ffffff;
    height: 100%;
    width: 320px;
    position: fixed;
    top: 0;
    left: -320px;
    overflow-y: auto;
    z-index: 9999;
    transition: all 400ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
    display: none;
    .mb-sidebar-heading {
      background: ${({ colors }) => colors.gr_bg};
      padding: 25px;
      h5 {
        color: #ffffff;
        text-transform: uppercase;
      }
      .close-menu-btn {
        svg {
          font-size: 22px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    .mb-sidebar-menu {
      padding: 25px;
      .mb-menu-item {
        border-top: 1px solid ${({ colors }) => colors.border1};
        &:last-child {
          border-bottom: 1px solid ${({ colors }) => colors.border1};
        }
        button.mb-menu-button {
          border: none;
          background: transparent;
          display: block;
          width: 100%;
          padding: 10px 0;
          text-align: left;

          p,
          p a {
            font-size: 14px;
            color: ${({ colors }) => colors.black1};
            text-transform: uppercase;
            i {
              font-size: 13px;
              float: right;
              border: 1px solid ${({ colors }) => colors.border3};
              border-radius: 25px;
              padding: 3px;
            }
            &:hover {
              color: ${({ colors }) => colors.green};
              i {
                border-color: ${({ colors }) => colors.green};
              }
            }
          }
        }

        .mb-menu-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease-in-out;

          ul {
            li {
              border-top: 1px solid ${({ colors }) => colors.border1};
              a {
                font-size: 13px;
                color: ${({ colors }) => colors.black2};
                display: block;
                padding: 10px 0;
                padding-left: 15px;
                &:hover {
                  color: ${({ colors }) => colors.green};
                }
              }
            }
          }
        }

        .mb-menu-content.show {
          max-height: 100%;
        }
      }
    }

    @media (max-width: 991px) {
      display: block;
    }

    @media (max-width: 480px) {
      max-width: 275px;
    }
  }

  .mb-sidebar.opened {
    left: 0 !important;
  }

  .mb-sidebar-overlay {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: block;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1111;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s ease;
  }

  .mb-sidebar-overlay.visible {
    visibility: visible;
    opacity: 1;
  }
`;

//     return Styles
// }
