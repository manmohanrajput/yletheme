import styled from 'styled-components';

// export const StyleFun = (colors) =>{

export const Styles = styled.div`
  .gallery-page {
    .gallery-page-area {
      padding: 70px 0;
      .gallery-box {
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 30px;
        position: relative;
        img {
          transition: all 0.3s ease;
          &:hover {
            transform: scale(1.1);
          }
        }
      }

      @media (max-width: 767px) {
        padding: 30px 0;
        
        .pdfDiv_img{
          height: 'auto !important';
          width: '150px !important';
        }
        .pdfDiv_title{
          margin-top: 70px !important;
        }
      }
    }
  }
`;
// return Styles;
// }
