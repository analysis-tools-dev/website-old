import { css } from "twin.macro"
export const SliderContentImageStyle = css`
    height: inherit;  
    margin-left: auto;  
    margin-right: auto;  
  `
export const SliderStyle = css`
    .slick-prev:before,
    .slick-next:before {
      color: #222425!important;
    }
    .slick-slide {
      padding: 0rem 1rem 0rem 1rem;
    }
  `
export const SliderContentStyle = css`
    margin: 1rem 0rem 1rem 0.1rem;
    transition: transform .2s;
    height: 8rem;
    background: #f7f7f7;
    text-align: center;
    cursor: pointer;
    border-radius: 0.5rem;

    &:hover {
      -ms-transform: scale(1.005);
      -webkit-transform: scale(1.005);
      transform: scale(1.005);
    }

    &:focus {
      outline: none;
      -webkit-box-shadow: 0px 0px 4px 0px rgba(173,173,173,1);
      -moz-box-shadow: 0px 0px 4px 0px rgba(173,173,173,1);
      box-shadow: 0px 0px 4px 0px rgba(173,173,173,1);
    }
  ` 
export const getSliderSetting = noOfElements => {
  const maxSlidesToShow = noOfElements < 3 ? 2 : 3;
  return {
    focusOnSelect: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: maxSlidesToShow,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: maxSlidesToShow,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
}
