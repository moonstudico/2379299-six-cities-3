import { useState } from 'react';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';

type Props = {
  offer: Offer;
}


function OfferCard({offer}:Props):JSX.Element{
  const [activeOffer, setActiveOffer] = useState(false);
  const {title, price, type} = offer;
  function changeMouseOver(){
    setActiveOffer(true);
  }
  function changeMouseOut(){
    setActiveOffer(false);
  }

  function changeOnClick(){
    setActiveOffer(false);
  }


  return(
    <article
      className="cities__card place-card"
      onMouseOver = {changeMouseOver}
      onMouseOut = {changeMouseOut}

    >
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2
          className="place-card__name"
          onClick={changeOnClick}
        >
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;

