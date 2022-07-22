import styled from "styled-components/macro";
// import { colors } from "../element/elements.js";
// import { } from "../common/element/elements.js";
// let colors = getColor();

// export const StyleFun = (colors) => {
export const Styles = styled.div`

    .breadcrumb-area {
        background-size    : cover;
        background-position: center;
        background-repeat  : no-repeat;
        padding            : 60px 0;
        position           : relative;
        margin-top         : 20px;
        
        &:before {
            position  : absolute;
            content   : '';
            background: ${({colors}) => colors.bg1};
            opacity   : 0.5;
            width     : 100%;
            height    : 100%;
            top       : 0;
            left      : 0;
        }
        .breadcrumb-box {
            background: ${({colors}) => colors.bg1};
            display   : inline-block;
            padding   : 30px 45px;
            border-radius : 5px;

            h2.breadcrumb-title {
                color         : #ffffff;
                font-weight   : 600;
                text-transform: uppercase;
                margin-bottom : 5px;

                @media(max-width: 767px) {
                    font-size : 20px;
                }
            }

            nav {
                ol.breadcrumb {
                    display         : inline-flex;
                    padding         : 0;
                    margin-bottom   : 0;
                    background-color: transparent;
                    border-radius : 0;

                    li {
                        a {
                            color: ${({colors}) => colors.green};

                            &:hover {
                                color: #ffffff;
                            }
                        }
                    }

                    li.active {
                        color: ${({colors}) => colors.border3};

                        &::before {
                            color: ${({colors}) => colors.border3};
                        }
                    }
                }
            }
        }

        @media(max-width: 767px) {
            padding: 30px 0;
        }
    }
`;
//     return Styles
// }
