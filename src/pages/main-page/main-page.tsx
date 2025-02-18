import OfferCard from '../../components/offer-card/offer-card.tsx';
import Map from '../../components/map/map.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import ListCities from '../../components/list-cities/list-cities.tsx';
import { useState } from 'react';
import SortOffers from './sort-offers.tsx';
import { cities } from '../../helpers/const.ts';
import { PointForMap } from '../../types/point-for-map.ts';
import { SetupForMap } from '../../types/setup-for-map.ts';
import { selectOffersByCity } from './selectors.ts';

function MainPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<string>('');
  const [activeSort, setActiveSort] = useState<string>('Popular');
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentCity = useAppSelector((state) => state.city.currentCity);
  const currentOffers = useAppSelector((state) =>
    selectOffersByCity(state, currentCity, activeSort)
  );
  const authorizationStatus = useAppSelector(
    (state) => state.loading.authorizationStatus
  );

  const pointsForMap: PointForMap[] =
    currentOffers?.map((offer) => ({
      lat: offer.location.latitude,
      long: offer.location.longitude,
      id: offer.id,
    })) ?? [];

  const setupForMap: SetupForMap | undefined =
    currentOffers.length > 0
      ? {
        lat: currentOffers[0].city.location.latitude,
        long: currentOffers[0].city.location.longitude,
        zoom: currentOffers[0].city.location.zoom,
      }
      : undefined;

  return (
    <main
      className={`page__main page__main--index ${
        currentOffers.length > 0 ? '' : 'page__main--index-empty'
      }`}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <ListCities city={city} key={city} />
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        {currentOffers.length > 0 ? (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentOffers.length} place
                {currentOffers.length > 1 ? 's' : ''} to stay in {currentCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>&nbsp;
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                  onClick={() => {
                    setIsShow(!isShow);
                  }}
                >
                  {activeSort}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use href="#icon-arrow-select"></use>
                  </svg>
                </span>
                {
                  <SortOffers
                    activeSort={activeSort}
                    isShow={isShow}
                    onSortChange={setActiveSort}
                    onClose={() => setIsShow(false)}
                  />
                }
              </form>
              <div className="cities__places-list places__list tabs__content">
                {currentOffers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onSetActiveOffer={setActiveOffer}
                    authorizationStatus={authorizationStatus}
                    isNear={false}
                  />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                pointsForMap={pointsForMap}
                setupForMap={setupForMap}
                activeOffer={activeOffer}
                className={'cities__map map'}
              />
            </div>
          </div>
        ) : (
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in{' '}
                  {currentCity}
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MainPage;
