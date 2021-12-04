import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
    <section class="Content">
    <div class="detail">
        <h1 class="detail__label">Detail Restaurant</h1>
        <div class="detail__info" id="post-item">
            
        </div>
        <div id="likeButtonContainer"></div>
    </div>
</section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailResturant(url.id);
    const restaurantContainer = document.querySelector('#post-item');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });
  },

};
export default Detail;
